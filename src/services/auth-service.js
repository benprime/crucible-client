import config from '../config';
import EventEmitter from 'events';
import openSocket from 'socket.io-client';

export let socket;

export const loginEvent = new EventEmitter();

export const errorFormatter = async resp => {
  var json = await resp.json();
  if(!resp.ok) {
    let errors = [];
    if(Array.isArray(json.errors)) {
      errors = json.errors.map(e => e.msg);
    } else {
      errors = [json.message];
    }
    return Promise.reject(errors);
  }
  return json;
};

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
  })
  .then(errorFormatter);
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
  .then(errorFormatter)
  .then(resp => {
    let socketUrl = `${config.crucibleMudSocketUri}?token=${resp.token}`;
    console.log("connecting to socket: ", socketUrl)
    socket = openSocket(socketUrl);
    loginEvent.emit('login', socket);
    return resp;
  });
};