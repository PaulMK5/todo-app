import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { getTasks, createTask, deleteTask } from '../api/taskApi';
import {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest
} from '../actionCreator';
import TodoForm from '../components/TodoForm';

const Todo = props => {
  const navigate = useNavigate();

  /* useEffect(() => {
    getTasks()
      .then(tasks => {
        setTodos(tasks);
      })
      .catch(err => {
        console.log('Error in Todo page getTasks: ', err);
        console.log('navigating to home');
        navigate('/');
      });
  }, []); */

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
    deleteTask(taskId);
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
