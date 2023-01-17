import ACTIONS from './actionTypes';

const initialState = {
  counter: 0,
  step: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT_ACTION: {
      return {
        ...state,
        counter: state.counter + state.step
      };
    }
    case ACTIONS.DECREMENT_ACTION: {
      return {
        ...state,
        counter: state.counter - state.step
      };
    }
    case ACTIONS.CHANGE_STEP: {
      return {
        ...state,
        step: action.data
      };
    }
    default: {
      return state;
    }
  }
};
