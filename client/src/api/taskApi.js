import { API_BASE } from '../constants';
import { history } from '../App';
import { refreshSession } from './userApi';

export const getTasks = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await fetch(`${API_BASE}/tasks/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }
  if (response.status === 403) {
    await refreshSession();
    return history.replace('/');
  }
  return response.json();
};

export const createTask = async data => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  });

  if (response.status === 400) {
    const error = await response.json();
    console.log('error in taskApi.createTask: ', error);
    return Promise.reject(error);
  }
  if (response.status === 403) {
    await refreshSession();
    // return history.replace('/');
  }
  return response.json();
};

export const deleteTask = async data => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  });

  if (response.status === 400) {
    const error = await response.json();
    console.log('error in taskApi.createTask: ', error);
    return Promise.reject(error);
  }
  if (response.status === 403) {
    if (response.status === 403) {
      await refreshSession();
      return history.replace('/');
    }
  }
  return Promise.resolve();
};
