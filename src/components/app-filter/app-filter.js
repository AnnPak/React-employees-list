import { Component } from 'react';

import "./app-filter.css";

class AppFilter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            filterBy: ''
        }
    }

    onUpdateFilter = (e) => {
        const filterBy = e.currentTarget.getAttribute('name');
        this.setState({filterBy})
        this.props.onUpdateFilter(filterBy)
    }


    render(){
        const buttonsData = [
            {name: 'all', label: 'Все сотрудники'},
            {name: 'increase', label: 'На повышение'},
            {name: 'salary', label: 'З/П больше 1000$'},
        ];

        const buttons = buttonsData.map(({name, label}) => {
            const active = this.props.filter === name;
            const clazz = active ? 'btn-light' : ' btn-outline-light';

            return(
                <button type="button"
                        className={`btn ${clazz}`} 
                        name={name}
                        onClick={this.onUpdateFilter}>
                        {label}
                </button>
            )
        })
        // btn-outline-light
        return (
            <div className="btn-group">
               {buttons}
            </div>
        )
    }
    
}

export default AppFilter;