import ACTIONS from './actionTypes';

const initialState = {
  user: null,
  tasks: [],
  isFetching: false,
  error: null
};

export const reducer = (state = initialState, action) => {
  console.log('action in reducer: ');
  console.log(action);
  switch (action.type) {
    case ACTIONS.LOGIN_USER_ERROR:
    case ACTIONS.GET_USER_ERROR:
    case ACTIONS.REGISTER_USER_ERROR:
    case ACTIONS.GET_TASKS_ERROR:
    case ACTIONS.CREATE_TASK_ERROR:
    case ACTIONS.DELETE_TASK_ERROR: {
      return {
        ...state,
        error: action.data
      };
    }

    case ACTIONS.LOGIN_USER_SUCCESS:
    case ACTIONS.GET_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        error: null
      };
    }
    case ACTIONS.GET_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.data,
        error: null
      };
    }
    case ACTIONS.CREATE_TASK_SUCCESS: {
      const { data: newTask } = action;
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        error: null
      };
    }
    case ACTIONS.DELETE_TASK_SUCCESS: {
      const {
        data: { _id }
      } = action;
      const filtered = state.tasks.filter(task => task._id !== _id);
      return {
        ...state,
        tasks: filtered,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
