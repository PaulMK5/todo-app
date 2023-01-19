import ACTIONS from './actionTypes';

export const loginUserRequest = data => {
  return {
    type: ACTIONS.LOGIN_USER_REQUEST,
    data
  };
};

export const loginUserSuccess = data => {
  return {
    type: ACTIONS.LOGIN_USER_SUCCESS,
    data
  };
};

export const loginUserError = data => {
  return {
    type: ACTIONS.LOGIN_USER_ERROR,
    data
  };
};

export const registerUserRequest = data => {
  return {
    type: ACTIONS.REGISTER_USER_REQUEST,
    data
  };
};

export const registerUserSuccess = data => {
  return {
    type: ACTIONS.REGISTER_USER_SUCCESS,
    data
  };
};

export const registerUserError = data => {
  return {
    type: ACTIONS.REGISTER_USER_ERROR,
    data
  };
};

//tasks

export const getTasksRequest = () => {
  return {
    type: ACTIONS.GET_TASKS_REQUEST
  };
};

export const getTasksSuccess = data => {
  return {
    type: ACTIONS.GET_TASKS_SUCCESS,
    data
  };
};

export const getTasksError = data => {
  return {
    type: ACTIONS.GET_TASKS_ERROR,
    data
  };
};

export const createTaskRequest = data => {
  return {
    type: ACTIONS.CREATE_TASK_REQUEST,
    data
  };
};

export const createTaskSuccess = data => {
  return {
    type: ACTIONS.CREATE_TASK_SUCCESS,
    data
  };
};

export const createTaskError = data => {
  return {
    type: ACTIONS.CREATE_TASK_ERROR,
    data
  };
};

export const deleteTaskRequest = data => {
  return {
    type: ACTIONS.DELETE_TASK_REQUEST,
    data
  };
};

export const deleteTaskSuccess = data => {
  return {
    type: ACTIONS.DELETE_TASK_SUCCESS,
    data
  };
};

export const deleteTaskError = data => {
  return {
    type: ACTIONS.DELETE_TASK_ERROR,
    data
  };
};
