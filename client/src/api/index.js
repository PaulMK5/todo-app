import { API_BASE } from '../constants';

export const registerUser = async data => {
  const response = await fetch(`${API_BASE}/users/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 400) {
    const res = await response.json();
    return Promise.reject(res);
  }

  return response.json();
};

export const getAllTasks = async data => {
  const response = await fetch(`${API_BASE}/tasks/`, {
    method: 'GET'
  });

  if (response.status === 400) {
    const res = await response.json();
    console.log('ERROR:', res);
  }
};
