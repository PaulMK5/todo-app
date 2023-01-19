import React from 'react';
import { Formik, Form, Field } from 'formik';
import { loginUserRequest } from '../../actionCreator';
import { connect } from 'react-redux';

const initialValues = {
  email: '',
  password: ''
};

const SignIn = props => {
  const onSubmit = (values, actions) => {
    props.loginUserRequest(values);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {props => (
          <Form>
            <Field name="email" placeholder="Type your email" />
            <Field name="password" placeholder="Type your password" />
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  loginUserRequest
};

const WrappedComponent = connect(null, mapDispatchToProps)(SignIn);

export default WrappedComponent;
