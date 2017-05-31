import React,{Component,PropTypes} 	from 'react'

import * as actions    				from '../../action/customer-tables.js'
import { connect } 					from 'react-redux';

const Th = props => (
	<th><span>{props.children}</span></th>
)

class Tr extends Component{
	render(){
		return (
			<tr>
				{this.props.children}
			</tr>
		)
	}
}

class Td extends Component{
	render(){
		return(
			<td>{this.props.children}</td>
		)
	}
}

class DelBtn extends Component{
	render(){
		return (
			<button type='button' onClick={this.props.onClick}>删除</button>
		)
	}
}

export default class Customer extends Component{
	constructor(props){
		super(props);
		// this.state = {
		// 	cusData:[
		// 		{
		// 			name: '小小001',
		// 			sex: '女001',
		// 			tel: '12888984732'
		// 		},
		// 		{
		// 			name: '小小002',
		// 			sex: '女002',
		// 			tel: '12888984732'
		// 		},  
		// 		{
		// 			name: '小小003',
		// 			sex: '女004',
		// 			tel: '12888984732'
		// 		}
		// 	]
		// }
	}
	render(){
		const { props } = this
		// console.log(this.props);
		return (
			<div>
				<table>
					<thead>
						<tr>
						{
							this.props.thList.map((list,index)=>{
							
								return <th key={index}>{list}</th>
							})
						}
						</tr>
					</thead>
					<tbody>
						{
							props.cusData.map((list,index)=>{
								return (
									<Tr key = {index}>
										<Td>{index}</Td>
										<Td>{list.name}</Td>
										<Td>{list.sex}</Td>
										<Td>{list.tel}</Td>
										<Td> 
											<DelBtn onClick = {() =>props.dispatch(actions.delCustomer(index))}></DelBtn>
										</Td>
									</Tr>
								)
						
							})
						}
					</tbody>	

					
				</table>		
			</div>

		)
	}
	delHandle(index){
		
	}
}


Customer.defaultProps = {
	thList : ['序号','姓名','姓别','电话','操作']
}


connect(
	({customer}) => ({state: customer})

)(Customer)