import React,{ Component } from 'react'
import { Route,  HashRouter as Router , HashRouter, Link,IndexRouter } from 'react-router-dom'


import Main from './body'

import  MainIndex from './components/main/index'
import  SimpleForm  from './components/forms/cus-form'

const Routers = () => (
	<Router>
		<Main>	
			<Route  path="/home" component={MainIndex}/>
			<Route path="/form" component = { SimpleForm }/>
		</Main>
	</Router>
)
export default Routers
