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
