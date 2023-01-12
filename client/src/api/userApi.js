import { API_BASE } from '../constants';
import { history } from '../App';

export const registerUser = async data => {
  const response = await fetch(`${API_BASE}/users/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status === 201) {
    const { user, tokens } = await response.json();
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    return user;
  }

  if (response.status !== 201) {
    const error = await response.json();
    console.log('error in registerUser: ', error);
    return Promise.reject(error);
  }
};

export const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return history.replace('/');
  }
  if (accessToken) {
    const res = await fetch(`${API_BASE}/users/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (res.status === 403) {
      await refreshSession();
    }
    const { user } = await res.json();
    return user;
  } else {
    history.replace('/');
  }
};

export async function refreshSession() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return history.replace('/');
  }
  const res = await fetch(`${API_BASE}/users/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken })
  });
  if (res.status === 403 || res.status === 404) {
    return history.replace('/');
  }
  const tokenPair = await res.json();
  localStorage.setItem('refreshToken', tokenPair.refreshToken);
  localStorage.setItem('accessToken', tokenPair.accessToken);
  return;
}

/* const response = await fetchUserWithAuth(token);
  if (response.status === 401 && response.headers.get('error') === 'refresh') {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetchUserWithAuth(refreshToken);
    if (response.status === 201) {
      return Promise().resolve();
       const res = await response.json();
      localStorage.setItem('accessToken', res.accessToken);
      const respWithUser = await fetchUserWithAuth(res.accessToken);
      return respWithUser.json(); 
    } else if (
      response.status === 401 &&
      response.headers.get('error') === 'refreshTokenExpired'
    ) {
      history.push('/');
      alert('refresh token expired, please login again');
      return Promise.reject('refresh token expired, please login again');
    } */

export const loginUser = async userInput => {
  const res = await fetch(`${API_BASE}/users/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInput)
  });
  if (res.status === 404) {
    const error = await res.json();
    return Promise.reject(error);
  }

  const { user, tokens } = await res.json();
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);

  return user;
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
  history.push('/');
};
