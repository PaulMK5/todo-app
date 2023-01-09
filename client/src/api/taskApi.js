import { API_BASE } from '../constants';

export const getTasks = async data => {
  const response = await fetch(`${API_BASE}/tasks/`, {
    method: 'GET'
  });

  if (response.status === 400) {
    const res = await response.json();
    console.log('ERROR:', res);
  }
};
