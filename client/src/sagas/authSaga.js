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
    const data = yield loginUser(action.data);
    if (!data) {
      yield put(getUserError('No response from loginUser'));
    }
    yield put(loginUserSuccess(data.user));
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
    const data = yield getUser();
    if (!data) {
      return;
    }
    yield put(getUserSuccess(data.user));
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
    history.push('/tasks');
  } catch (error) {
    yield put(registerUserError(error.response.data.error));
  }
}
