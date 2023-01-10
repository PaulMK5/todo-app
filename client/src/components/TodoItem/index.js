import React from 'react';

const TodoItem = ({ item: { body, deadline, status } }) => {
  return (
    <li>
      <div>task: {body}</div>
      <div>deadline: {new Date(deadline).toDateString()}</div>
      <div>status: {status}</div>
    </li>
  );
};

export default TodoItem;
