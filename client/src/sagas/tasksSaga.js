import { put } from 'redux-saga/effects';
import { getTasks, createTask, deleteTask } from '../api/taskApi';
import {
  getTasksSuccess,
  getTasksError,
  createTaskSuccess,
  createTaskError,
  deleteTaskSuccess,
  deleteTaskError
} from '../actionCreator';
import { history } from '../App';

export function* getTasksSaga() {
  try {
    const data = yield getTasks();
    if (!data) {
      return history.replace('/');
    }
    yield put(getTasksSuccess(data.tasks));
  } catch (error) {
    yield put(getTasksError(error.response.data.error));
  }
}

export function* createTaskSaga(action) {
  try {
    const data = yield createTask(action.data);
    if (!data) {
      return history.replace('/');
    }
    yield put(createTaskSuccess(data.task));
  } catch (error) {
    if (error.response) {
      yield put(createTaskError(error.response.data.error));
    } else {
      yield put(createTaskError(error.message));
    }
  }
}

export function* deleteTaskSaga(action) {
  try {
    const data = yield deleteTask(action.data);
    if (!data) {
      return history.replace('/');
    }
    yield put(deleteTaskSuccess(data.task));
  } catch (error) {
    if (error.response) {
      yield put(deleteTaskError(error.response.data.error));
    } else {
      yield put(deleteTaskError(error.message));
    }
  }
}
