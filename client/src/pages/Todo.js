import { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest
} from '../actionCreator';
import TodoForm from '../components/TodoForm';

const Todo = props => {
  useEffect(() => {
    props.getTasksRequest();
  }, []);

  /* const getNewTask = data => {
    createTask({
      authorId: props.user._id,
      status: 'new',
      ...data
    })
      .then(task => {
        const newTodos = [...todos, task];
        setTodos(newTodos);
      })
      .catch(error => {
        console.log(error);
      });
  }; */

  const getNewTask = data => {
    props.createTaskRequest({
      status: 'new',
      ...data
    });
  };

  /* const removeTask = taskId => {
    deleteTask({ taskId })
      .then(() => {
        const filtered = todos.filter(task => task._id !== taskId);
        setTodos(filtered);
      })
      .catch(error => {
        console.log(error);
      });
  }; */

  const removeTask = taskId => {
    props.deleteTaskRequest(taskId);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm sendTask={getNewTask} />
      <TodoList todos={props.tasks} removeTask={removeTask} />
    </div>
  );
};

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest
};

const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Todo);

export default WrappedComponent;
