import React, {Component} from 'react';
import classNames from 'classnames';
import './queryInput.scss';

const ICONS = {
    ANIMALS: 'fa fa-paw fa-2x has-text-primary',
    COMMANDS: 'fa fa-chain fa-2x has-text-danger',
};

const ANIMALS = {
    CAT: 'CAT',
    DOG: 'DOG',
    GOAT: 'GOAT',
    COW: 'COW'
};

const COLORS = {
    RED: 'RED',
    BLUE: 'BLUE',
    YELLOW: 'YELLOW'
};

const STATES = {
    ANIMAL: 'ANIMAL',
    COLOR: 'COLOR'
};

const COMMANDS = {
    WHERE: 'where',
    AND: 'and',
    OR: 'or',
    NOT: 'not'
};

const STATE_OPTIONS = {
    [STATES.ANIMAL]: ANIMALS,
    [STATES.COLOR]: COLORS,
    UNIVERSAL: COMMANDS
};

const ALL = {
    ANIMALS,
    COMMANDS,
    COLORS
};

const findIcon = value => {
    const category = Object.keys(ALL)
        .map(key => Object.values(ALL[key]).find((el) => el === value) ? key : null)
        .filter(value => value !== null)[0];
    return ICONS[category];
};

findIcon('DOG');

export class QueryInput extends Component {

    state = {
        query: '',
        isDropdownActive: false,
        queryStep: STATES.ANIMAL
    };

    focusInput = () => {
        this.inputRef.focus();
    };

    onChange = ({target: {value: query}}) => {
        this.setState({
            query,
            isDropdownActive: true
        });
    };

    selectOption = option => {
        this.setState(({query}) => {
            const newQuery = query.split(' ');
            newQuery.pop();

            return {
                query: `${newQuery.join(' ')} ${option.value}`,
                isDropdownActive: false
            }
        }, this.focusInput);
    };

    filterQueryOptions = option => {
        const lastWord = this.state.query.split(" ").pop();
        return option.value.includes(lastWord);
    };

    render() {

        let currentOptions = [...Object.values(STATE_OPTIONS[this.state.queryStep]), ...Object.values(STATE_OPTIONS.UNIVERSAL)]
            .map(option => ({
                value: option,
                icon: findIcon(option)
            }))
            .filter(this.filterQueryOptions);

        const dropdownClasses = classNames({
            'query-input': true,
            'dropdown': true,
            'is-active': this.state.isDropdownActive
        });

        return (
            <div className={dropdownClasses}>
                <div className="dropdown-trigger">
                    <input className="input"
                           ref={el => this.inputRef = el}
                           placeholder="Search"
                           value={this.state.query}
                           onChange={this.onChange}
                           aria-haspopup="true"
                           aria-controls="dropdown-menu"
                    />
                </div>
                {
                    currentOptions.length ?
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                {
                                    currentOptions
                                        .map(option => (
                                            <a className="dropdown-item has-text-left"
                                               key={option.value}
                                               onClick={() => this.selectOption(option)}
                                            >
                                        <span className="icon mr-3">
                                            <i className={option.icon}></i>
                                        </span>
                                                {option.value.toLowerCase()}
                                            </a>
                                        ))
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}
