import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters,addNum,reduceNum,getTempList} from '../action/actions'
import { submit } from '../action/form-info'


import AddTodo 			from '../components/AddTodo'
import TodoList 		from '../components/TodoList'
import Footer 			from '../components/Footer'
import CountNum 		from '../components/counter'
import CustomerTable 	from '../components/customer-table/customer-table'
import SimpleForm		from '../components/forms/form-info'
import Test 			from '../components/test'


const fetchPost = postText =>(dispatch,getState)=>{
	dispatch(addTodo(postText));
	return (function(){
		// console.log('fetchPost');
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
	constructor(props){
		super(props);
		this.changeType = this.changeType.bind(this);
		this.state = {
			type: 1
		}
	}
	submit(values){
	    // Do something with the form values
	    console.log(values);
	    return false;
	}
	render(){
		// const {dispatch, visibleTodos, visibilityFilter,constMin,counter,customerList} = this.props
		const {props} = this
		console.log(this.props);
		return (
			<div>
				{
					this.state.type == 1?
					<Test 
				name="this is my name"
				></Test> : ''
				}
				<button type="button" onClick={this.changeType}>changeType</button>
				<SimpleForm onSubmit ={val => props.dispatch(submit(val))}/>
				<input type="text"/>
				<hr/>
				<CustomerTable cusData = {props.customer.cusData} dispatch ={props.dispatch}></CustomerTable>
				{
					props.customerList.map((items,index) => 
						<div key ={index}>
							<CustomerList name="姓名:" sex={items.sex}>{items.name}</CustomerList>
						</div>
					)
				}

				<CountNum
					counts = {props.counter}
					onAddCountClick = { val => props.dispatch(addNum(val))}

					onRecudeCountClick = { val => props.dispatch(reduceNum(val))}
				></CountNum>
				<span></span>
				<Form label="用户名：">{props.constMin}</Form>
				<AddTodo
					onAddClick={text => 
						props.dispatch(fetchPost(text))
					}
				/>
				<span></span>
				<TodoList
					todoas = {props.visibleTodos}
					// todos={[{
			  //           text: 'Use Redux',
			  //           completed: true
			  //         }, {
			  //           text: 'Learn to connect it to React',
			  //           completed: false
			  //         }]}

					onTodoClick = {todo => 
						// console.log('todo clicked:', todo)
						props.dispatch(toggleTodo(todo))
					}			
				></TodoList>
				<span></span>
				<Footer 
					filter = {this.props.visibilityFilter}
					onFilterChange = {
						nextFilter =>
							props.dispatch(setVisibilityFilter(nextFilter))
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
	changeType(){
		this.setState({
			type: 2
		})
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
  return Object.assign({},state,{
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    constMin: '100',
    counter: state.numText,
    customerList: state.getCostomerList,
    customer: state.customer,
    //form: state.simple
  });
}



// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；

export default connect(select)(App);