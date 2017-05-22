import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters,addNum,reduceNum,getTempList} from '../action/actions'


import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import CountNum from '../components/counter'
import CustomerTable from '../components/customer-table/customer-table'

const fetchPost = postText =>(dispatch,getState)=>{
	dispatch(addTodo(postText));
	return (function(){
		console.log('fetchPost');
		let tempText = postText+'fetch';
		dispatch(addTodo(tempText))
	})()
}


const Form = props => (
	<div className="from-group">
		<label>{props.label}</label>
		<span className="text">{props.children}</span>
	</div>

)


const CustomerList = props => (
		<div>
			<label>{props.name}</label>
			<span>{props.children}</span>
			<label>{props.sex}</label>
		</div>
)

class App extends Component{
	render(){
		const {dispatch, visibleTodos, visibilityFilter,constMin,counter,customerList} = this.props
		return (
			<div>
				<CustomerTable></CustomerTable>
				{
					this.props.customerList.map((items,index) => 
						<div key ={index}>
							<CustomerList name="姓名:" sex={items.sex}>{items.name}</CustomerList>
						</div>
					)
				}

				<CountNum
					counts = {this.props.counter}
					onAddCountClick = { val => dispatch(addNum(val))}

					onRecudeCountClick = { val => dispatch(reduceNum(val))}
				></CountNum>
				<span></span>
				<Form label="用户名：">{this.props.constMin}</Form>
				<AddTodo
					onAddClick={text => 
						dispatch(fetchPost(text))
					}
				/>
				<span></span>
				<TodoList
					todoas = {this.props.visibleTodos}
					// todos={[{
			  //           text: 'Use Redux',
			  //           completed: true
			  //         }, {
			  //           text: 'Learn to connect it to React',
			  //           completed: false
			  //         }]}

					onTodoClick = {todo => 
						// console.log('todo clicked:', todo)
						dispatch(toggleTodo(todo))
					}			
				></TodoList>
				<span></span>
				<Footer 
					filter = {visibilityFilter}
					onFilterChange = {
						nextFilter =>
							dispatch(setVisibilityFilter(nextFilter))
					}
					// filter = 'SHOW_ALL'
					// onFilterChange={
					// 	filter =>  console.log('filter change:',filter)
					// }
				>

				</Footer>
			</div>

		)
	}
	componentDidMount(){
		this.props.dispatch(getTempList());
	}
}

App.propTypes = {
	counter: PropTypes.number.isRequired,
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
	    text: PropTypes.string.isRequired,
	    completed: PropTypes.bool.isRequired
	})),
	visibilityFilter: PropTypes.oneOf([
		'SHOW_COMPLETED',
	    'SHOW_ALL',
	    'SHOW_ACTIVE'
	]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
	console.log(state);
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    constMin: '100',
    counter: state.numText,
    customerList: state.getCostomerList
  };
}



// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);