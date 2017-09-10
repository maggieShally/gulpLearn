import React,{ Component, PropTypes } from 'react'


function formatName(user){
	return user.firstName+  '' +user.lastName;
}


const user = {
	firstName: 'Maggie',
	lastName: 'Hu'
}


function getGreeting(user){
	if(user){
		return <h1>hello,{formatName(user)}</h1>
	}else {
		return <h1>hello .S tranger</h1>
	}
}

export default class element  extends Component{
	constructor(props){
		super(props);
		this.state = {
			date : new Date()
		}
	}
	render(){
		return(
			<div>{this.props.name}
			{getGreeting(user)}
			{ getGreeting() }
			<h2>
				It is {this.state.date.toLocaleTimeString()}
			</h2>
			</div>
		)
	}
	componentDidMount(){
		this.timerID = setInterval(
			()=>this.tick(),1000
		);
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
		alert('componentWillUnmount');
	}
	tick(){
		this.setState({
			date: new Date()
		})
	}

}








