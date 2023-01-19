import { exampleClickerAPI } from '../api/userApi';
import { put } from 'redux-saga/effects';
import { clickerResponseSuccess, clickerResponseError } from '../actionCreator';

export function* createClickerSaga(data) {
  try {
    const result = yield exampleClickerAPI(data);
    yield put(clickerResponseSuccess(result));
  } catch (err) {
    yield put(clickerResponseError(err));
  }
}
