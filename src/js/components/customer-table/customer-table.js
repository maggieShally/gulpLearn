import React,{Component,PropTypes} from 'react'


const Th = props => (
	<th><span>{props.children}</span></th>
)


class Tr extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<tr>
				<td>{this.props.index}</td>

				<td>{this.props.listArr.name}</td>
				// <td>{this.props.listArr.sex}</td>
				// <td>{this.props.listArr.tel}</td>

				 <td>{this.props.listArr}</td>
				<td> 
					<DelBtn onClick = {() =>this.props.onDelClick(this.props.index)}></DelBtn>
				</td>
			</tr>
		)
	}
}

class Td extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<td>{this.props.text}</td>
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
		this.state = {
			cusData:[
				{
					name: '小小001',
					sex: '女001',
					tel: '12888984732'
				},
				{
					name: '小小002',
					sex: '女002',
					tel: '12888984732'
				},
				{
					name: '小小003',
					sex: '女004',
					tel: '12888984732'
				}
			]
		}
	}
	render(){
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
							this.state.cusData.map((list,index)=>{
								return (
								<Tr 
									listArr={list} 
									key={index} 
									index={index}
									onDelClick = { index => this.delHandle(index)}
								>
								</Tr>
								)
							})
						}
						<tr>
							
						</tr>
					</tbody>	

					
				</table>		
			</div>

		)
	}
	delHandle(index){
		this.setState({
			csuData: this.state.cusData.splice(index,1)
		})
	}
}


Customer.defaultProps = {
	thList : ['序号','姓名','姓别','电话','操作']
}