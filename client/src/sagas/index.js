import { takeLatest } from 'redux-saga/effects';
import ACTIONS from '../actionTypes';
import { loginSaga, registerSaga } from './authSaga';
import { getTasksSaga, createTaskSaga, deleteTaskSaga } from './tasksSaga';

function* rootSaga() {
  yield takeLatest(ACTIONS.LOGIN_USER_REQUEST, loginSaga);
  yield takeLatest(ACTIONS.REGISTER_USER_REQUEST, registerSaga);
  yield takeLatest(ACTIONS.GET_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ACTIONS.CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(ACTIONS.DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;
