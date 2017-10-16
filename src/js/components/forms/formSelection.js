import React, { Component ,PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm,FieldArray  ,SubmissionError ,formValueSelector,FormSection  } from 'redux-form';


const renderField = ( {input,label,type} ) => (
	<div>
		<label>{label} : </label>
		<input type={type} {...input} placeholder = {label}/>
	</div>
)


class Address extends Component {
	render() {
		return <div>
			<Field name="streetName" component={renderField} type="text" label = '街道名'/>
			<Field name="number" component={renderField}   label = '门牌号' type="text"/>
			<Field name="zipCode" component={renderField}  label = '邮政编码'  type="text"/> 
		</div>
	}
}

class Party extends Component {
	render() {
		return <div>
			<Field name="givenName" 	component={renderField} 	type="text" label = '名字'/>
			<Field name="middleName" 	component={renderField} 	type="text" label = '中间名'/>
			<Field name="surname" 		component={renderField} 	type="text" label = '姓氏'/>
			<FormSection name="address">
				<Address/>
			</FormSection>
		</div>
	}
}

class OrderForm extends Component {
	render() {
		return <form >
			<h2>购买人：</h2>
			<FormSection name="buyer">
				<Party/>
			</FormSection>
			<h2>收货人：</h2>
			<FormSection name="recipient">
				<Party/>
			</FormSection>
		</form>
	}
}

Address.defaultProps = {
	name: "address"
}

OrderForm  = reduxForm({
	form: 'order_forms',
	initialValues : {
				buyer: {
					givenName: "xxx",
					middleName: "yyy",
					surname: "zzz",
					address: {
						streetName: '街道名',
						number: "123",
						zipCode: "9090"
					}
				},
				recipient: {
					givenName: "aaa",
					middleName: "bbb",
					surname: "ccc",
					address: {
						streetName: "foo",
						number: "4123",
						zipCode: "78320"
					}
				}
			}
})(OrderForm)





export default OrderForm