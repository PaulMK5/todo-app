import { put } from 'redux-saga/effects';
import { loginUser, registerUser } from '../api/userApi';
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError
} from '../actionCreator';

export function* loginSaga(action) {
  try {
    const user = yield loginUser(action.data);
    yield put(loginUserSuccess(user));
  } catch (error) {
    if (error.response) {
      yield put(loginUserError(error.response.data.error));
    } else {
      yield put(loginUserError(error.message));
    }
  }
}

export function* registerSaga(action) {
  try {
    const { data } = yield registerUser(action.data);
    yield put(registerUserSuccess(data));
  } catch (error) {
    yield put(registerUserError(error));
  }
}
