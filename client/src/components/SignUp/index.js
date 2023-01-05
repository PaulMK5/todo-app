import React from 'react'
import {Formik, Form, Field} from 'formik'


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: new Date()
}

const onSubmit = (values, actions) => {
  console.log(values);
}

const SignIn = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            <Field name='firstName' placeholder='Type your first name'/>
            <Field name='lastName' placeholder='Type your last name'/>
            <Field name='email' placeholder='Type your email'/>
            <Field name='password' placeholder='Type your password'/>
            <Field name='birthday' type='date'/>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignIn