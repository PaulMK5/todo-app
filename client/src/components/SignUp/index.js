import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { registerUserRequest } from '../../actionCreator';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: format(new Date(), 'yyyy-MM-dd')
};

const SignUp = props => {
  const onSubmit = (values, actions) => {
    props.registerUserRequest(values);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {props => (
          <Form>
            <Field name="firstName" placeholder="Type your first name" />
            <Field name="lastName" placeholder="Type your last name" />
            <Field name="email" placeholder="Type your email" />
            <Field name="password" placeholder="Type your password" />
            <Field name="birthday" type="date" />
            <button type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  registerUserRequest
};

const WrappedComponent = connect(null, mapDispatchToProps)(SignUp);

export default WrappedComponent;
