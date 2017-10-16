import React,{Component,PropTypes} from 'react'
import { Field, reduxForm,FieldArray  ,SubmissionError ,formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { submit,getCustomInfo } from '../../action/cus-form'


class MyCount extends Component {
  render(){
    const  { input: { value, onChange }} = this.props;
    return(
      <div>
        <span>the current value is { value }</span>
        <button type="button" onClick = { () => onChange(value+1 )}>Inc</button>
        <button type="button" onClick = { () => onChange(value -1 )}>Dec</button>
      </div>
    )
  }
}
  
const renderField = ({ input, label, type, meta: { touched, error, warning} }) => (
  <div>
    <label>{label}</label>
    <div>
      <input type={type} placeholder={label} {...input} />
      { 
        touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))
      }
    </div>
  </div>
)

 const renderHobbies = ({ fields })=> (
    <div>
        <ul>
            {
                fields.map((name,index) => 
                    <li key={index}>
                        <label htmlFor={name}>hobby #{index+1}</label>
                        <Field name={name} type="text" component="input"/>
                    </li>
                    
                )
            }
        </ul>
    </div>
  )
        
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class UserForm extends Component{
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.initForm = this.initForm.bind(this);
        this.state = {
               showInfo: false,
               formData: {}
            }
    }
    render(){
        const { load,handleSubmit, pristine, reset, submitting ,hasEmailValue} = this.props;
        const { showInfo, formData } = this.state;
       
        const upper = value => value&&value.toUpperCase();
      
        return(
            <div>
                <form onSubmit={handleSubmit(this.getDetails.bind(this))}>
                  <div>
                    <Field name="count" component = {MyCount}/>
                  </div>
                  <div>
                      <Field label="First Name" name="firstName" component={renderField} type="text" placeholder="First Name" normalize= {upper} />                   
                  </div>
                  <div>
                      <Field label="age" name="age" component={renderField} type="text" placeholder="age" />           
                  </div>
                  <div>
                    <label>Last Name</label>
                    <div>
                      <Field  name="lastName"  component="input"    type="text"    placeholder="Last Name" />
                    </div>
                  </div>
                  <div>
                    <Field name="hasEmail" label="hasEmail" type="checkbox" component = {renderField}/>
                  </div>
                 {
                  hasEmailValue &&
                     <div>
                        <label>Email</label>
                        <div>
                          <Field  name="email"  component="input" type="email" placeholder="Email"  />
                        </div>
                      </div>
                 }
                  <div>
                    <label>Sex</label>
                    <div>
                      <label>
                        <Field name="sex" component="input"  type="radio"  value="male"  /> {' '}  Male
                      </label>
                      <label>
                        <Field name="sex"    component="input"      type="radio"  value="female" />     {' '}    Female
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>Favorite Color</label>
                    <div>
                      <Field name="favoriteColor" component="select">
                        <option />
                        <option value="ff0000">Red</option>
                        <option value="00ff00">Green</option>
                        <option value="0000ff">Blue</option>
                      </Field>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="employed">Employed</label>
                    <div>
                      <Field
                        name="employed" id="employed" component="input"  type="checkbox"  />
                    </div>
                  </div>
                  <div>
                    <label>Nosssstes</label>
                    <div>
                      <Field name="notes" component="textarea" 
                      />
                    </div>
                  </div>
                  <div>
                      <label>hobby</label>
                      <div>
                          <FieldArray  name="hoddies" component = {renderHobbies}/>
                      </div>
                  </div>
                  <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                      Clear Values
                    </button>
                  </div>
                </form>
                <div className="formInfo">
                </div>
                {
                    showInfo ? <FormInfo formData = {formData} /> : null
                }
               
            </div>
        )
    }
    getDetails(values){
      return sleep(100).then(() => {
          if( !['JOHN','PAUL'].includes(values.firstName)){
            throw new SubmissionError({
              firstName: 'user dones not exist',
              _error: 'Login failed'
            })
          }else {
            console.log('submit',JSON.stringify(values,null,2));
          }
        })

        this.setState({
            showInfo: true,
            formData: values
        })
    }
    initForm(){
        const data = {
          firstName: 'Janesss',
          lastName: 'Doe',
          sex: 'male',
          count: 0,
          employed: true,
          email: 'langling10@163.com',
          favoriteColor: 'ff0000',
          notes: 'Born to write amazing Redux code.',
          hoddies: ['sings','dancingsssssssssss']
      }
      this.props.dispatch(getCustomInfo(data));
    }
    submit(){

    }
    componentDidMount(){
       this.initForm();
    }
}



class FormInfo extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { formData } = this.props;
    const formInfo = JSON.stringify(formData);
    console.log(formData);
    return(
      <div>
        <div>表单信息</div>
        <div>{formInfo}</div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};
  if( !values.firstName){
    errors.firstName = 'Required'
  }
  if( !values.age){
    errors.age = 'required';

  }else if(isNaN(Number(values.age))){
    errors.age = 'must be a number'
  }
  console.log('errors',errors)
  return errors;
}

const filedChange = ( values, dispatch, props) => {
  console.log('values:',values);
}




UserForm = reduxForm({
    form: 'UserForm',
    enableReinitialize:true,
    validate: validate,
    onChange: filedChange
})(UserForm)

const selector = formValueSelector('UserForm');

UserForm = connect(
    state => {
        const hasEmailValue = selector(state, 'hasEmail') ;

        return {
          hasEmailValue,
          initialValues: state.submitForm// pull initial values from account reducer
        }
    },
    {load: getCustomInfo}
)(UserForm)

export default UserForm