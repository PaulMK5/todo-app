import { useState, useEffect } from 'react';

import TodoList from '../components/TodoList';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>ToDo List</h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default Todo;
