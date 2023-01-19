import { exampleAPI } from '../api/userApi';
import { put } from 'redux-saga/effects';
import { requestCounterSuccess, requestCounterError } from '../actionCreator';

export function* createServerSaga(action) {
  console.log('in createServerSaga, action:');
  console.log(action);
  try {
    const result = yield exampleAPI(action.data);
    yield put(requestCounterSuccess(result));
  } catch (err) {
    yield put(requestCounterError(err));
  }
}
