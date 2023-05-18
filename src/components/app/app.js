import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesList from '../employees-list/employees-list';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			data: [
				{ name: 'Max', salary: 1800, increase: true, rise: true, id: 1 },
				{ name: 'John', salary: 900, increase: false, rise: false, id: 2 },
				{ name: 'Piter', salary: 1700, increase: false, rise: false, id: 3 },
				{ name: 'Kate', salary: 600, increase: false, rise: false, id: 4 }
			],
			term: '',
			filter: 'all'
		};
		this.maxId = 5;
	}

	addItem = (name, salary) => {
		if (name.length > 1 && salary.length > 1) {
			const newItem = {
				name,
				salary,
				increase: false,
				rise: false,
				id: this.maxId++
			};

			this.setState(({ data }) => {
				const newArr = [...data, newItem];
				return {
					data: newArr
				};
			});
		}
	};

	deleteItem = id => {
		this.setState(({ data }) => {
			return {
				data: data.filter(item => item.id !== id)
			};
		});
	};

	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] };
				}
				return item;
			})
		}));
	};

	searchEmp = (items, term) => {
	if (term.length === 0) {
			return items;
		}
		return items.filter(item => {
			return item.name.indexOf(term) > -1;
		});
	};

	onUpdateSearch = term => {
		this.setState({ term: term }); 
	};

	filterPost = (items, filter) => {
		switch (filter) {
			case 'onrise':
				return items.filter(item => item.rise);
			case 'moreThan1000':
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	};

	onFilterSelect = filter => {
		this.setState({ filter: filter });
	};

	render() {
		const { data, term, filter } = this.state;
		const employees = this.state.data.length;
		const increased = this.state.data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);
		return (
			<div className='app'>
				<AppInfo employees={employees} increased={increased} />

				<div className='search-panel'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter
						filter={filter} 
						onFilterSelect={this.onFilterSelect}
					/>
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
				/>
				<EmployeesAddForm onAdd={this.addItem} />
			</div>
		);
	}
}

export default App;
