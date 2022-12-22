import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Black', salary: 560, id: 1},
                {name: 'Maria Green', salary: 1200, id: 2},
                {name: 'Kira Nefedova', salary: 1000000, id: 3}
            ]
        }
    }

    generateID() {
        return Math.random().toString(16).slice(2);
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newData = data.filter(item => item.id != id);
            return {
                data: newData
            }
        });
    }

    addEmployee = (e, form) => {
        e.preventDefault();
        this.setState(({data}) => {
            const newData = [...data];
            newData.push({name: form.state.name, salary: form.state.salary, id: this.generateID()});
            return {
                data: newData
            }
        });
        form.setState({name: '', salary: ''});
    }

    onToggleIncrease = (id) => {
        console.log(id, 'increase');
    }

    onToggleRise = (id) => {
        console.log(id, 'rise');
    }

    render() {
        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployeesAddForm
                onAdd={this.addEmployee} />
            </div>
        );
    }
}

export default App;


/* 
const index = data.findIndex(elem => elem.id === id);

const before = data.slice(0, index);
const after = data.slice(index+1);

const newData = [...before, ...after];

*/