import ACTIONS from './actionTypes';

const initialState = {
  counter: 0,
  step: 0,
  isFetching: false,
  serverResponse: null,
  error: null,
  clickerResponse: null
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
    case ACTIONS.REQUEST_COUNTER_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ACTIONS.REQUEST_COUNTER_SUCCESS: {
      return {
        ...state,
        serverResponse: action.data
      };
    }
    case ACTIONS.REQUEST_COUNTER_ERROR: {
      return {
        ...state,
        error: action.data
      };
    }
    case ACTIONS.CLICKER_FETCH: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ACTIONS.CLICKER_RESPONSE_SUCCESS: {
      console.log('action in reducer');
      console.log(action);
      return {
        ...state,
        clickerResponse: action.data
      };
    }
    case ACTIONS.CLICKER_RESPONSE_ERROR: {
      return {
        ...state,
        error: action.data
      };
    }
    default: {
      return state;
    }
  }
};
