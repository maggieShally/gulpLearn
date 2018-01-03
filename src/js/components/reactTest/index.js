import React, { Component } from 'react'


const numbers = [1,2,3,4,5,6];


class Couter extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<span>{value}</span>
				<button onClick={onIncreaseClick}>Increase</button>
			</div>
		)
	}
}

export default Couter



class HelloWord extends Component {
	constructor(props){
		super(props)
		this.state= {
			title: 'hello world',
			show:false
		}
	}
	render(){
		const { title, show } = this.state;
		return(
			<div>
				{title}
				<p>{ show ? 'ON':'OFF'}</p>
				<Greeting {...{show}}/>
				<button type="button" onClick={(e)=>{this.changeTitle(show,e)}}>changeTitle</button>
				<button type="button" onClick={()=>{this.toggle()}}>toggle</button>
				<hr/>
				<NumberList {...{numbers}}/>
				<hr/>
				<FormComponent/>
				<hr/>
				<WelcomeDialog/>
			</div>

		)	
	}
	componentDidMount(){
		const { title } = this.state;
		console.log('componentDidMount-title',title);
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log(nextProps, nextState);
		if(nextState.title==='this is changeTitle'){
			return true
		}else {
			return true
		}
		
	}
	componentWillUpdate(){
		const { title } = this.state;
		console.log('componentWillUpdate-title',title);
	}
	componentDidUpdate(){
		const { title } = this.state;
		console.log('componentDidUpdate-title',title);

	}
	changeTitle(show,e){
		console.log(e.target);
		console.log(show);

		this.setState({
			title: 'this is changeTitle'
		})
	}
	toggle(){
		this.setState(preState=>({
			show: !preState.show
		}),()=>{
			console.log(123)
		})
	}
}


function Greeting(props){
	const { show } = props;
	if(show){
		return <TrueGreeting/>	
	}else {
		return <FalseGreeting/>
	}
}

const TrueGreeting = props =>{
	return <h2>TrueGreeting</h2>
}

const FalseGreeting = props =>{
	return <h2>FalseGreeting</h2>
}

const NumberList = props =>{
	const { numbers } = props;
	const listItem = numbers.map((item,index)=>{
		return <li key={index}>numberList:{item}</li>
	})
	return <ul>{listItem}</ul>
}



class FormComponent extends  Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			infoText: 'this is infoText',
			favio: 'coconut',
			agree: false
		}
	}
	handleSubmit(event){
		event.preventDefault();
		alert('A name was submitted:'+this.state.name+'infoText:'+this.state.infoText)

	}
	handleChange(event){
		const target = event.target;
		const name = target.name
		const value = target.type ==='checkbox' ? target.checked : target.value
		this.setState({
			[name]: value
		})

	}
	textHandleChange(event){
		this.setState({
			infoText: event.target.value
		})
	}
	selectHandleChange(event){
		this.setState({
			favio: event.target.value
		})
	}
	render(){
		const  { name ,infoText, favio, agree} = this.state
		return(
			<div>
			<input type="text"/>
			<form onSubmit={(e)=>this.handleSubmit(e)}>
				<label>
					Agree:
					<input type="checkbox" checked={agree} name="agree" onChange={(e)=>this.handleChange(e)}/>
					
				</label>
				<label>
					Name:
					<input type="text" value ={name} name="name" onChange={(e)=>this.handleChange(e)}/>	
				</label>
				<label>
					TextArea:
					<textarea value={infoText} name="infoText" onChange={(e)=>this.handleChange(e)}/>
				</label>
				<lable>
					Favio:
					<select value={favio} name="favio" onChange={(e)=>this.handleChange(e)}>
						<option value="lemon">lemon</option>
						<option value="coconut">coconut</option>
						<option value="mango">mango</option>
					</select>
				</lable>
				<input type="submit" value="submit"/>

			</form>
			userInput: {name}
			infoText: {infoText}
			favio: {favio}
			agree: {agree}
			</div>

		)
	}
}

const FancyBorder = props =>{
	return(
		<div>
			<div className={props.color}>
				{props.left}
			</div>
			<div className={props.color}>
				{props.right}
			</div>
		</div>
	)
}

const LeftSec = props => {
	return (<div>this is Left</div>)
}
const RightSec = props => {
	return (<div>this is Right</div>)
}

const WelcomeDialog = props=>{
	return(
		<FancyBorder color="red"
			left = { <LeftSec/>}
			right ={<RightSec/>}
		>this is redColor</FancyBorder>
	)
}

// export default HelloWord