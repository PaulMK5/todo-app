import {API_BASE} from '../constants';

export const registerUser = data => {
  return fetch(`${API_BASE}/users/registration`, {
    method: 'POST',
    headers: {}
  }).then()  
}