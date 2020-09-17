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
      setUserSession(response.data);
      return response;
    }).catch(error => {
      console.log('Error');
    });
}

export const addSong = newSong => {
  return axios
    .post('songs/songs', {
      info: newSong
    })
    .then(response => {
      return response;
    })
}

export const getSong = () => {
  return axios
    .get('songs/songs')
    .then(response => {
      return response.data;
    })
}
