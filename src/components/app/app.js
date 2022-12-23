import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function generateID() {
    return Math.random().toString(16).slice(2);
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Black', salary: 560, increase: false, rise: true, id: 1},
                {name: 'Maria Green', salary: 1200, increase: true, rise: false, id: 2},
                {name: 'Kira Nefedova', salary: 1000000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all',
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term: term}); // можно сократить до просто {term}
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
        if (Object.values(form.state).every(item => item.trim() != '')) {
            this.setState(({data}) => {
                const newData = [...data];
                newData.push({
                    name: form.state.name, 
                    salary: form.state.salary, 
                    id: generateID(), 
                    increase: false,
                    rise: false
                });
    
                return {
                    data: newData
                }
            });
            form.setState({name: '', salary: ''});
        }
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmployees = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default: 
                return items;
        }
    }

    onUpdateFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmployees(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                employees={employees}
                increased={increased} />
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter} />
                </div>

                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm
                    onAdd={this.addEmployee} />
            </div>
        );
    }
}

export default App;
export {generateID};

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