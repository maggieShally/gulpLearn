import React,{Component,PropTypes} from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class SimpleForm extends Component{
  constructor(props) {
    super(props);
    
  }
  render(){
      const { fields:{firstname,lastname,email,sex,favoriteColor,employed,note},handleSubmit, pristine, reset, submitting } = this.props;
      return (
        <form onSubmit={handleSubmit}>
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
      );
    }
}


SimpleForm = reduxForm({
  form: 'simple', // a unique identifier for this form
  fields:['firstname','lastname','email','sex','favoriteColor','employed','notes'],
})(SimpleForm);





SimpleForm = connect(
  state => ({
    initialValues: state.submitForm // pull initial values from account reducer
  }),
)(SimpleForm)



export default SimpleForm







