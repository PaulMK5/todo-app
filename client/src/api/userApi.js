import { API_BASE } from '../constants';
import axios from 'axios';
import { history } from '../App';

const axiosInst = axios.create({ baseURL: `${API_BASE}/users` });

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

export const registerUser = async userInput => {
  const res = await axiosInst.post('/sign-up', userInput);
  return res.data;
};

export const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.log('No access token found!');
    return;
  }
  const res = await axiosInst.get('');
  return res.data;
};

export async function refreshSession() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return history.replace('/');
  }
  await axiosInst.post('/refresh', { refreshToken });
}

export const loginUser = async userInput => {
  const res = await axiosInst.post('/sign-in', userInput);
  return res.data;
};

/* export const loginUser = async data => {
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

  if (response.status === 404) {
    const error = await response.json();
    console.log('received 404 response with error in loginUser: ', error);
    return Promise.reject(error);
  }

  return response.json();
}; */

export const logoutUser = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  history.replace('/');
};
