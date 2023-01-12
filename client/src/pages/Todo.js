import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { getTasks, createTask, deleteTask } from '../api/taskApi';
import TodoForm from '../components/TodoForm';

const Todo = props => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTasks()
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.log('Error in Todo page getTasks: ', err);
        console.log('navigating to home');
        navigate('/');
      });
  }, []);

  const getNewTask = data => {
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

  const removeTask = taskId => {
    deleteTask({ taskId })
      .then(() => {
        const newTodos = todos;
        const filtered = newTodos.filter(task => task._id !== taskId);
        setTodos(filtered);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm sendTask={getNewTask} />
      <TodoList todos={todos} removeTask={removeTask} />
    </div>
  );
};

export default Todo;
