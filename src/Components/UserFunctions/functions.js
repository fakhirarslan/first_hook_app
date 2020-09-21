import axios from 'axios';
import { setUserSession } from '../Utils/common';

export const register = newUser => {
  return axios
    .post('users/register', {
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      phone: newUser.phone
    })
    .then(response => {
      return response;
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email, password: user.password
    })
    .then(response => {
      console.log(response.data);
      setUserSession(response.data);
      return response;
    }).catch(error => {
      console.log('Error');
    });
}
