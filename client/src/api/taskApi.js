import { API_BASE } from '../constants';
import { history } from '../App';
import axios from 'axios';
import { refreshSession, logoutUser } from './userApi';

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

axiosInst.interceptors.response.use(
  response => {
    if (response.data.tokens) {
      const {
        data: { tokens }
      } = response;
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    return response;
  },
  async err => {
    if (err.response.status === 403 && localStorage.getItem('refreshToken')) {
      console.log('REFRESH');
      await refreshSession();
      console.log('RETRY');
      const accessToken = localStorage.getItem('accessToken');
      err.config.headers = {
        ...err.config.headers,
        Authorization: `Bearer ${accessToken}`
      };
      return await axiosInst(err.config);
    } else if (err.response.status === 401) {
      logoutUser();
      history.replace('/');
    } else {
      return Promise.reject(err);
    }
  }
);

export const getTasks = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return;
  }
  const res = await axiosInst.get('');
  return res.data;
};

export const createTask = async data => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return;
  }
  const response = await axiosInst.post('', data);
  return response.data;
};

export const deleteTask = async taskId => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return;
  }

  const response = await axiosInst.delete('', { data: { taskId } });
  return response.data;
};
