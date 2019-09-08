import config from '../config';
import EventEmitter from 'events';
import openSocket from 'socket.io-client';

export let socket;

export const loginEvent = new EventEmitter();

export const signup = (email, username, password) => {
  return fetch(`${config.crucibleMudSocketUri}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });
};

export const login = async (email, password) => {
  return fetch(`${config.crucibleMudSocketUri}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(resp => {
    if(!resp.ok) return Promise.reject(resp.statusText);
    console.log(resp)
    return resp.json();
  })
  .then(resp => {
    let socketUrl = `${config.crucibleMudSocketUri}?token=${resp.token}`;
    console.log("connecting to socket: ", socketUrl)
    socket = openSocket(socketUrl);
    window.socket = socket;
    socket.emit('output', 'what is going on');
    loginEvent.emit('login', socket);
    return resp;
  })
};