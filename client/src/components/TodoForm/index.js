import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';

const initialValues = {
  body: '',
  deadline: format(new Date(), 'yyyy-MM-dd')
};

const TodoForm = props => {
  const onSubmit = (values, actions) => {
    props.sendTask(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {props => (
        <Form>
          <Field name="body" placeholder="New task..." />
          <Field name="deadline" type="date" />
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
