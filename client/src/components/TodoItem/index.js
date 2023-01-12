import React from 'react';

const TodoItem = ({ removeTask, item: { _id, body, deadline, status } }) => {
  const deleteTask = () => {
    removeTask(_id);
  };

  return (
    <li>
      <div>task: {body}</div>
      <div>deadline: {new Date(deadline).toDateString()}</div>
      <div>status: {status}</div>
      <button onClick={deleteTask}>X</button>
    </li>
  );
};

export default TodoItem;
