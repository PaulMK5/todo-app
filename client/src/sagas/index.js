import { takeLatest } from 'redux-saga/effects';
import ACTIONS from '../actionTypes';
import { createServerSaga } from './serverSaga';
import { createClickerSaga } from './clickerSaga';

function* rootSaga() {
  yield takeLatest(ACTIONS.REQUEST_COUNTER_FETCHING, createServerSaga);
  yield takeLatest(ACTIONS.CLICKER_FETCH, createClickerSaga);
}

export default rootSaga;
