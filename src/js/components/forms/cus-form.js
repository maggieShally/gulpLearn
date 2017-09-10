import React,{Component,PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { submit,getCustomInfo } from '../../action/cus-form'

const data = {
          firstName: 'Janesss',
          lastName: 'Doe',
          sex: 'male',
          employed: true,
          email: 'langling10@163.com',
          favoriteColor: 'ff0000',
          notes: 'Born to write amazing Redux code.',
      }
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
        const { load,handleSubmit, pristine, reset, submitting } = this.props;
        const { showInfo, formData } = this.state;
        return(
            <div>
                <button type="button" onClick={()=>load(data)}>getInfo</button>
                <form onSubmit={handleSubmit(this.getDetails.bind(this))}>
                  <div>
                    <label>First Name</label>
                    <div>
                      <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
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
                        />
                        {' '}
                        Male
                      </label>
                      <label>
                        <Field name="sex" 
                        component="input" 
                        type="radio" 
                        value="female" 
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
                      />
                    </div>
                  </div>
                  <div>
                    <label>Notes</label>
                    <div>
                      <Field name="notes" component="textarea" 
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
                <div className="formInfo">
                </div>
                {
                    showInfo ? <FormInfo formData = {formData} /> : null
                }
               
            </div>
        )
    }
    getDetails(values){
        console.log(values);
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
          employed: true,
          email: 'langling10@163.com',
          favoriteColor: 'ff0000',
          notes: 'Born to write amazing Redux code.',
      }
      this.props.dispatch(getCustomInfo(data));
    }
    submit(){

    }
    componentDidMount(){
        // this.initForm();
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


UserForm = reduxForm({
    form: 'UserForm',
    enableReinitialize:true,
})(UserForm)


UserForm = connect(
    state => ({
        initialValues: state.submitForm// pull initial values from account reducer

    }),
    {load: getCustomInfo}
)(UserForm)

export default UserForm