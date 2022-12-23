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
                {name: 'John Black', salary: 560, increase: false, rise: true, id: 1},
                {name: 'Maria Green', salary: 1200, increase: true, rise: false, id: 2},
                {name: 'Kira Nefedova', salary: 1000000, increase: false, rise: false, id: 3}
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
            newData.push({
                name: form.state.name, 
                salary: form.state.salary, 
                id: this.generateID(), 
                increase: false,
                rise: false
            });

            return {
                data: newData
            }
        });
        form.setState({name: '', salary: ''});
    }

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }));
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className="app">
                <AppInfo 
                employees={employees}
                increased={increased} />
    
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

// this.setState(({data}) => {
//     const index = data.findIndex(elem => elem.id === id);

//     const old = data[index];
//     const newItem = {...old, increase: !old.increase};

//     const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];
//     return {
//         data: newArr
//     }
// })