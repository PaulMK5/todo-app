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
    const error = await response.json();
    console.log('error in registerUser: ', error);
    return Promise.reject(error);
  }

  return response.json();
};

export const loginUser = async data => {
  const response = await fetch(`${API_BASE}/users/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 400) {
    const error = await response.json();
    console.log('received 400 response with error in loginUser: ', error);
    return Promise.reject(error);
  }

  if (response.status === 403) {
    const error = await response.json();
    console.log('received 403 response with error in loginUser: ', error);
    return Promise.reject(error);
  }

  return response.json();
};
