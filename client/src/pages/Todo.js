import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { getTasks, createTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm';

const Todo = props => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!props.user) {
      return navigate('/');
    }

    getTasks(props.user._id)
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log('Error in Todo page getTasks: ', err);
      });
  }, []);

  const getTask = data => {
    createTask({
      authorId: props.user._id,
      status: 'new',
      ...data
    })
      .then(({ data: createdTask }) => {
        const newTodos = [...todos, createdTask];
        setTodos(newTodos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm sendTask={getTask} />
      <TodoList todos={todos} />
    </div>
  );
};

export default Todo;
