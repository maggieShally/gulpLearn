import ReactDOM from 'react-dom'
import { Component } from 'react'
import { connect } from 'react-redux'


class Counter extends Component{
	render() {
		return (
			<div>			
				<button onClick={this.props.onIncrement}>
					{this.props.value}
				</button>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		value: state.counter
	}
}

function mapDispatchToProps(dispatch){
	return {
		onIncrement: ()=>dispatch(increment())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter)