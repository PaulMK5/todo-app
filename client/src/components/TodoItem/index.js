import React from 'react';

const TodoItem = ({ removeTask, item: { _id, body, deadline, status } }) => {
  return (
    <li>
      <div>task: {body}</div>
      <div>deadline: {new Date(deadline).toDateString()}</div>
      <div>status: {status}</div>
      <button
        onClick={() => {
          removeTask(_id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
