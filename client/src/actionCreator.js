import ACTIONS from './actionTypes';

export const incrementAction = () => {
  return {
    type: ACTIONS.INCREMENT_ACTION
  };
};

export const decrementAction = () => {
  return {
    type: ACTIONS.DECREMENT_ACTION
  };
};

export const changeStep = data => {
  return {
    type: ACTIONS.CHANGE_STEP,
    data
  };
};

export const requestCounterFetching = data => {
  return {
    type: ACTIONS.REQUEST_COUNTER_FETCHING,
    data
  };
};

export const requestCounterSuccess = data => {
  return {
    type: ACTIONS.REQUEST_COUNTER_SUCCESS,
    data
  };
};

export const requestCounterError = data => {
  return {
    type: ACTIONS.REQUEST_COUNTER_ERROR,
    data
  };
};

export const clickerSendData = data => {
  return {
    type: ACTIONS.CLICKER_FETCH,
    data
  };
};

export const clickerResponseSuccess = data => {
  return {
    type: ACTIONS.CLICKER_RESPONSE_SUCCESS,
    data
  };
};

export const clickerResponseError = data => {
  return {
    type: ACTIONS.CLICKER_RESPONSE_ERROR,
    data
  };
};
