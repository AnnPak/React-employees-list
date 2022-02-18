import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [
                { name: 'Johnni Sakward', salary: 800, increase: true, rise:true, id: 1 },
                { name: 'Mike Kovalsky', salary: 3000, increase: true, rise:false, id: 2 },
                { name: 'Carl W', salary: 5000, increase: false, rise:false, id: 10 },
            ],
            term: '',
            filterBy: 'all',
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {           
            return{
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        this.setState(({data}) => {   
            const newItem = {
                name: name,
                salary: salary, 
                increase: false,
                rise: false,
                id: this.maxId++
            };
            const newArr = [...data, newItem];        
            return{
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return{...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
    countIncrease = () => {
        let count = 0;
        
        this.state.data.forEach(item => {
            if(item.increase === true){
                ++count;
            }
        });
        return count;
    }
    
    searchEmp = (items, term) => {
        if(term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }
    filterEmp = (items, filterBy) => {
        switch (filterBy){
            case 'increase':
                return items.filter(item => item.increase);
            case 'salary':
                return items.filter(item => item.salary >= 1000);
            default:
                return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }
    onUpdateFilter = (filterBy) => {
        this.setState({filterBy});
    }
    onUpdateSalary = (el, id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return{...item, salary: el}
                }
                return item;
            })
        }))
        console.log(el, id);
    }

    render(){
        const {data, term, filterBy} = this.state;
        const countEmployees = data.length;
        const countIncrease = data.filter(item => item.increase).length;
        const visibleDate = this.filterEmp( this.searchEmp(data, term), filterBy);

        return ( 
            <div className="app">
                <AppInfo countEmployees = {countEmployees} countIncrease = {countIncrease}/>
            
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter onUpdateFilter={this.onUpdateFilter} filter={filterBy}/>
                </div>
                
                <EmployeesList 
                    data={visibleDate}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onUpdateSalary={this.onUpdateSalary}/>
                <EmployeesAddForm
                    onAdd = {this.addItem}/>
            </div>
        )
    }
    
};

export default App;