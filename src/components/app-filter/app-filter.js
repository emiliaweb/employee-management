import { Component } from 'react';

import { generateID } from '../app/app';

import './app-filter.css';

function AppFilter(props) {

    const onUpdateFilter = (e) => {
        e.preventDefault();
        const currentFilter = e.currentTarget.getAttribute('data-filter');
        props.onUpdateFilter(currentFilter);
    }

    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThan1000', label: 'З/п больше 1000'},
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const classes = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button 
                className={`btn ${classes}`}
                type="button"
                data-filter={name}
                onClick={onUpdateFilter}
                key={generateID()}>
                {label}
            </button>
        )
    })

    
    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;