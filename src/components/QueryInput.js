import React, {Component} from 'react';
import './queryInput.scss';

const ICONS = {
    ANIMALS: 'fa fa-paw fa-2x has-text-primary',
    COMMANDS: 'fa fa-link fa-2x',
    COLORS: 'fa fa-eye-dropper fa-2x has-text-danger',
    FIELD_NAMES: 'fa fa-cog fa-2x has-text-info',
    SIZE: 'fa fa-bullseye fa-2x has-text-warning'
};

const ANIMALS = {
    CAT: 'CAT',
    DOG: 'DOG',
    GOAT: 'GOAT',
    COW: 'COW'
};

const COLORS = {
    RED: '"RED"',
    BLUE: '"BLUE"',
    YELLOW: '"YELLOW"'
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

const FIELD_NAMES = {
    COLOR: 'color',
    SIZE: 'size',
    type: 'type'
};

const SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    BIG: 'big'
};

const ALL = {
    ANIMALS,
    COMMANDS,
    COLORS,
    FIELD_NAMES,
    SIZE
};

const findIcon = value => {
    const category = Object.keys(ALL)
        .map(key => Object.values(ALL[key]).find((el) => el.toLowerCase() === value.toLowerCase()) ? key : null)
        .filter(value => value !== null)[0];
    return ICONS[category];
};

export class QueryInput extends Component {

    state = {
        query: '',
        queryStep: STATES.ANIMAL
    };

    focusInput = () => {
        this.inputRef.focus();
    };

    onChange = ({target: {value: query}}) => {
        this.setState({
            query
        });
    };

    selectOption = option => {
        this.setState(({query}) => {
            const newQuery = query.split(' ');
            newQuery.pop();

            return {
                query: `${newQuery.join(' ')} ${option.value} `
            }
        }, this.focusInput);
    };

    filterQueryOptions = option => {
        const lastWord = this.state.query.split(" ").pop();
        return option.value.toLowerCase().startsWith(lastWord.toLowerCase().replace("\"", ''));
    };

    render() {

        let currentOptions = [
            ...Object.values(ALL.ANIMALS),
            ...Object.values(ALL.COMMANDS),
            ...Object.values(ALL.COLORS),
            ...Object.values(ALL.FIELD_NAMES),
            ...Object.values(ALL.SIZE)
        ]
            .map(option => ({
                value: option,
                iconName: findIcon(option)
            }))
            .filter(this.filterQueryOptions);

        return (
            <div className="dropdown is-active query-input">
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
                                            <a className="dropdown-item"
                                               key={option.value}
                                               onClick={() => this.selectOption(option)}
                                            >
                                        <span className="icon mr-3">
                                            <i className={option.iconName}></i>
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
