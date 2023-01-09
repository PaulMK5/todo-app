import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  passwordHash: '',
  birthday: format(new Date(), 'yyyy-MM-dd')
};

const SignUp = props => {
  const onSubmit = (values, actions) => {
    props.sendData(values);
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
            <Field name="passwordHash" placeholder="Type your password" />
            <Field name="birthday" type="date" />
            <button type="submit">Send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
