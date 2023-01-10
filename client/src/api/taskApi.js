import { API_BASE } from '../constants';

export const getTasks = async userId => {
  const response = await fetch(`${API_BASE}/tasks/${userId}`);

  if (response.status === 400) {
    const error = await response.json();
    console.log('error in taskApi.getTasks: ', error);
    return Promise.reject(error);
  }

  return response.json();
};

export const createTask = async data => {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 400) {
    const error = await response.json();
    console.log('error in taskApi.createTask: ', error);
    return Promise.reject(error);
  }

  return response.json();
};
