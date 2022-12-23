import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        }
    }

    onUpdateFilter = (e) => {
        e.preventDefault();
        this.props.onUpdateFilter(e.currentTarget.getAttribute('data-filter'));
    }

    render() {
        return (
            <div className="btn-group">
                <button 
                    className="btn btn-light"
                    type="button"
                    data-filter=""
                    onClick={this.onUpdateFilter}>
                    Все сотрудники
                </button>
                <button 
                    className="btn btn-outline-light"
                    type="button"
                    data-filter="rise"
                    onClick={this.onUpdateFilter}>
                    На повышение
                </button>
                <button 
                    className="btn btn-outline-light"
                    type="button"
                    data-filter="moreThan1000"
                    onClick={this.onUpdateFilter}>
                    З/п больше 1000
                </button>
            </div>
        );
    }
}

export default AppFilter;