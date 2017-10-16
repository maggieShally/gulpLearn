import React, { Component } from 'react'
import { Field, FieldArray, reduxForm} from 'redux-form'
import { connect } from 'react-redux';




const renderField = ( {input,label,type,meta: {touched, error }} ) => (
	<div>
		<lable>{label}</lable>
		<div>
			<input type={type} {...input} placeholder = {label}/>
			{touched && error && <span  className="error">{error}</span>}
		</div>
	</div>
)

const renderHobbies = ( { fields, meta: {error }} ) => (
	<ul className="fieldBox">
		<li>
			<button type="button" onClick = {()=> fields.push()}> ++ Add Hobbies </button>
		</li>
		{
			fields.map((hobby,index) => (
				<li key = {index}>
					<button  className="fildDelet"  type="button" onClick= { () => fields.remove(index)}>remove</button>
					<Field
						name = {hobby}
						type = 'text'
						component = {renderField}
						label = {`Hobby ${index+1}`}
					/>
				</li>
			))
		}
		{
			error && <li className="error">{error}</li>
		}
	</ul>

)


const renderMembers = ( { fields, meta : { error, submitFailed  }}) => (
	<ul className="fieldBox">
		<li>
			<button type="button" onClick = { ()=> fields.push({})}>Add Member</button>			
			{
				submitFailed  && error && <span  className="error">{error}</span>
			}
		</li>
		{
			fields.map((member,index) =>(
				<li key = {index}>
					<button type="button" className="fildDelet" onClick = { () => fields.remove(index)}>Remove {index}</button>
					<h4>member #{index + 1}</h4>
					<Field
						name = { `${member}.firstName`}
						type = 'text'
						component = { renderField }
						label = 'First Name'
					/>
					<Field
						name = { `${member}.lastName`}
						type = 'text'
						component = { renderField }
						label = 'Last Name'
					/>

					<FieldArray
						name = {`${member}.hobbies`}
						component = { renderHobbies}
					/>
				</li>
			))
		}
	</ul>
)

class FieldArraysForm extends Component {
	constructor(props){
		super(props);
		this.getValues = this.getValues.bind(this);
	}
	render(){
		const  { handleSubmit ,pristine, reset, submitting } = this.props;
		return(
			<div>
			<form onSubmit = { handleSubmit(this.getValues) }>
				<Field
					name= 'clubName'
					type='text'
					label='Club Name'
					component = { renderField }
				/>
				<FieldArray name="members" component = {renderMembers} />
				<div>
					<button type='submit' disabled = {submitting}>Submit</button>
					<button type='button' disabled =  { pristine || submitting } onClick = {reset} >Clear Values</button>
				</div>
			</form>
			</div>
		)
	}
	getValues(values){
		console.log('values',values);
	}
}


const validate = values => {
	const errors = {};
	if(!values.clubName){
		errors.clubName = 'required'
	}
	if(!values.members || !values.members.length){
		errors.members = {_error: 'At least one member must be entered'}
	}else {
		const membersArrayErrors = [];
		values.members.forEach((member,memberIndex) =>{

			const memberErrors = {};
			if(!member || !member.firstName){
				memberErrors.firstName = 'required';
				membersArrayErrors[memberIndex] = memberErrors;
			}
			if( !member || !member.lastName){
				memberErrors.lastName = 'required';
				membersArrayErrors[memberIndex] = memberErrors;
			}
			if( member && member.hobbies && member.hobbies.length ){
				const hobbyArrayErrors = [];
				member.hobbies.forEach((bobby,bobbyIndex)=>{
					if( !bobby || !bobby.length){
						hobbyArrayErrors[bobbyIndex] = 'required';
					}
				})
				
				if(hobbyArrayErrors.length){
					memberErrors.hobbies = hobbyArrayErrors;
					membersArrayErrors[memberIndex] = memberErrors;
				}

			}
		});

		if (membersArrayErrors.length) {
	      	errors.members = membersArrayErrors
	    }
	}
	console.log('errors',errors);
	return errors;

}

FieldArraysForm = reduxForm({
	form: 'fieldsArrays',
	validate
})(FieldArraysForm)



export default FieldArraysForm