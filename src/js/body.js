import React, { Component } from 'react'
import {  Route, BrowserRouter as Router,Link,NavLink } from 'react-router-dom'

class Main extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="mainWrapper">
				<ul className="nav">
					<li><NavLink to="/home" activeClassName="selected">home</NavLink></li>
					<li><NavLink to="/form" activeClassName="selected">form</NavLink></li>
					<li><NavLink to="/fieldArraysform" activeClassName="selected">fieldArraysform</NavLink></li>
					<li><NavLink to="/orderForm" activeClassName="selected">orderForm</NavLink></li>
					<li><NavLink to="/helloWord" activeClassName="selected">helloWord</NavLink></li>
				</ul>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}


export default Main