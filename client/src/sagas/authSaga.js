import { put } from 'redux-saga/effects';
import { loginUser, registerUser, getUser } from '../api/userApi';
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  getUserSuccess,
  getUserError
} from '../actionCreator';
import { history } from '../App';

export function* loginSaga(action) {
  try {
    const { user } = yield loginUser(action.data);
    yield put(loginUserSuccess(user));
    history.push('/tasks');
  } catch (error) {
    if (error.response) {
      yield put(loginUserError(error.response.data.error));
    } else {
      yield put(loginUserError(error.message));
    }
  }
}

export function* getUserSaga() {
  try {
    const { user } = yield getUser();
    if (!user) {
      return;
    }
    yield put(getUserSuccess(user));
    history.push('/tasks');
  } catch (error) {
    if (error.response) {
      yield put(getUserError(error.response.data.error));
    } else {
      yield put(getUserError(error.message));
    }
  }
}

export function* registerSaga(action) {
  try {
    const { user } = yield registerUser(action.data);
    yield put(registerUserSuccess(user));
  } catch (error) {
    yield put(registerUserError(error));
  }
}
