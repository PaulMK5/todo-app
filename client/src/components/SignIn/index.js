import React from 'react';
import { Formik, Form, Field } from 'formik';
import { loginUser } from '../../api/userApi';

const initialValues = {
  email: '',
  password: ''
};

const SignIn = props => {
  const onSubmit = (values, actions) => {
    props.sendData({ cb: loginUser, values });
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

export default SignIn;
