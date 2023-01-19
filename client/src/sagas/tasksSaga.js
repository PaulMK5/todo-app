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

export function* getTasksSaga(action) {
  try {
    const { data } = yield getTasks();
    yield put(getTasksSuccess(data));
  } catch (error) {
    yield put(getTasksError(error));
  }
}

export function* createTaskSaga(action) {
  try {
    const { data } = yield createTask(action.data);
    yield put(createTaskSuccess(data));
  } catch (error) {
    yield put(createTaskError(error));
  }
}

export function* deleteTaskSaga(action) {
  try {
    const { data } = yield deleteTask(action.data);
    yield put(deleteTaskSuccess(data));
  } catch (error) {
    yield put(deleteTaskError(error));
  }
}
