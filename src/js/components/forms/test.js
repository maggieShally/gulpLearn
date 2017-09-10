import React,{Component,PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { submit,getCustomInfo } from '../../action/cus-form'

class SimpleForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
       showInfo: false,
       formData: {}
    }
  }
  render(){
      const { showInfo,formData } = this.state;
      const { fields:{firstname,lastname,email,sex,favoriteColor,employed,note},handleSubmit, pristine, reset, submitting } = this.props;
      return (
        <div>
        <button type="button" onClick={this.addFormInfo.bind(this)}>添加数据</button>
        <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
                {...firstname}
              />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
                {...lastname}
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
                {...email}
              />
            </div>
          </div>
          <div>
            <label>Sex</label>
            <div>
              <label>
                <Field name="sex" 
                component="input" 
                type="radio" 
                value="male" 
                {...sex}
                />
                {' '}
                Male
              </label>
              <label>
                <Field name="sex" 
                component="input" 
                type="radio" 
                value="female" 
                {...sex}
                />
                {' '}
                Female
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
                name="employed"
                id="employed"
                component="input"
                type="checkbox"
                {...employed}
              />
            </div>
          </div>
          <div>
            <label>Notes</label>
            <div>
              <Field name="notes" component="textarea" 
              {...note}
              />
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>

        {
          showInfo ? <FormInfo formData = {formData} /> : null
        }
        </div>
      );
    }
    componentDidMount(){
      
    }
    addFormInfo(){
      const data = {
        firstName: 'Jane',
          lastName: 'Doe',
          sex: 'male',
          employed: true,
          email: 'langling10@163.com',
          favoriteColor: 'ff0000',
          notes: 'Born to write amazing Redux code.',
      }
      this.props.dispatch(getCustomInfo(data));
    }
    submit(values){
      this.setState({
        showInfo: true,
        formData: values
      })
    }
}


SimpleForm = reduxForm({
  form: 'simple', // a unique identifier for this form
  fields:['firstname','lastname','email','sex','favoriteColor','employed','notes'],
  initialValues: {
    sex: 'male',
  }

})(SimpleForm);


SimpleForm = connect(
  state => {
    console.log('submitForm:',state.submitForm);
    return {
      initialValues: state.submitForm
    }
    // pull initial values from account reducer
  },
  {getCustomInfo}
)(SimpleForm)

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

export default SimpleForm







