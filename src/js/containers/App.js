import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm} from 'redux-form';

import { addTodo,toggleTodo,setVisibilityFilter,VisibilityFilters,addNum,reduceNum,getTempList} from '../action/actions'
import { submit,getCustomInfo } from '../action/cus-form'


import AddTodo 			from '../components/AddTodo'
import TodoList 		from '../components/TodoList'
import Footer 			from '../components/Footer'
import CountNum 		from '../components/counter'
import CustomerTable 	from '../components/customer-table/customer-table'
import SimpleForm		from '../components/forms/cus-form'

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



class SearchForm extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const {
			fields:{
				keywords,
				sex
			}
		} = this.props;
		return(
			<div>
				<div>
					<input type="text" placeholder="keywords" {...keywords}
					/>
				</div>
				<div>
					<select name="" id="" {...sex}>
						<option value="-1">请选择</option>
						<option value="1">男</option>
						<option value="2">女</option>
					</select>
				</div>
				<div>
					<button type="button">search</button>
				</div>
			</div>
		)
	}
}


SearchForm = reduxForm({
  form: 'search_form', // a unique identifier for this form
  fields:[
  	'keywords',
  	'sex'
  ],
},state=>{
	return {
		initialValues: state.searchFormData
	}
})(SearchForm);


class App extends Component{
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
				<SearchForm></SearchForm>
				<hr/>
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
		// const data = {
		// 	firstName: 'Jane',
		// 	  lastName: 'Doe',
		// 	  sex: 'male',
		// 	  employed: true,
		// 	  email: 'langling10@163.com',
		// 	  favoriteColor: 'ff0000',
		// 	  notes: 'Born to write amazing Redux code.',
		// }
		// this.props.dispatch(getCustomInfo(data));
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