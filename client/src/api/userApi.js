import { API_BASE } from '../constants';
import axios from 'axios';
import { history } from '../App';

const axiosInst = axios.create({ baseURL: `${API_BASE}/users` });

export const registerUser = async userInput => {
  const res = await axiosInst.post('/sign-up', userInput);

  if (res.status === 201) {
    localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
    localStorage.setItem('accessToken', res.data.tokens.accessToken);
    return res.data.user;
  }

  if (res.status !== 201) {
    console.log('error in registerUser: ', res.data);
    return Promise.reject(res.data);
  }
};

export const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }

  return axiosInst
    .get('', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      console.log('RESPONSE DATA', res.data);
      return res.data.user;
    })
    .catch(err => {
      console.log('error in getUser: ', err);
      if (err.status === 403 && localStorage.getItem('refreshToken')) {
        refreshSession();
      }
    });
};

export async function refreshSession() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return history.replace('/');
  }

  const res = await axiosInst.post('/refresh', { refreshToken });

  if (res.status === 403 || res.status === 404) {
    return history.replace('/');
  }
  localStorage.setItem('refreshToken', res.data.tokens.refreshToken);
  localStorage.setItem('accessToken', res.data.tokens.accessToken);
  return;
}

export const loginUser = async userInput => {
  const res = await axiosInst.post('/sign-in', userInput);

  if (res.status !== 200) {
    return Promise.reject(res.data.error);
  }

  localStorage.setItem('accessToken', res.data.tokens.accessToken);
  localStorage.setItem('refreshToken', res.data.tokens.refreshToken);

  return res.data.user;
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
  localStorage.removeItem('token');
  history.replace('/');
};
