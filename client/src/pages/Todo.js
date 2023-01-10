import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { getTasks, createTask } from '../api/taskApi';
import { loginUser } from '../api/userApi';
import TodoForm from '../components/TodoForm';

const Todo = props => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!props.user) {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('FOUND TOKEN! sending request to login');
        loginUser({ token: token })
          .then(res => {
            console.log('received response: ');
            console.log(res);
            props.sendUser(res.user);
            // if (!res.err) {
            console.log('requesting user tasks');
            getTasks(res.user._id).then(res => {
              console.log('recieved tasks getTasks(res.user._id): ');
              console.log(res);
              setTodos(res.data);
            });
            // }
          })
          .catch(err => {
            console.error('Error caught in Todo Page useEffect', err);
            localStorage.removeItem('token');
            navigate('/');
          });
      } else {
        return navigate('/');
      }
    } else {
      getTasks(props.user._id)
        .then(res => {
          setTodos(res.data);
        })
        .catch(err => {
          console.log('Error in Todo page getTasks: ', err);
        });
    }
  }, [props.user]);

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
