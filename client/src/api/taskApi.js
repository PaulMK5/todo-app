import { API_BASE } from '../constants';
import { history } from '../App';
import axios from 'axios';
import { refreshSession } from './userApi';

const axiosInst = axios.create({ baseURL: `${API_BASE}/tasks` });

axiosInst.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

export const getTasks = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await axiosInst.get('');
  if (response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }
  if (response.status === 403) {
    await refreshSession();
    // return history.replace('/');
  }
  return response.data.tasks;
};

export const createTask = async data => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await axiosInst.post('', data);

  if (response.status === 400) {
    console.log('error in taskApi.createTask: ', response.data);
    return Promise.reject(response.data);
  }
  if (response.status === 403) {
    await refreshSession();
    // return history.replace('/');
  }
  return response.data.task;
};

export const deleteTask = async data => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  const response = await axiosInst.delete('', { data: data });

  if (response.status === 400) {
    console.log('error in taskApi.createTask: ', response.data);
    return Promise.reject(response.data);
  }
  if (response.status === 403) {
    if (response.status === 403) {
      await refreshSession();
      return history.replace('/');
    }
  }
  return Promise.resolve();
};
