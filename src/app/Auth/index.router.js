const {register, login, getMe} = require('./index.controller');

module.exports = [
  { prefix: 'auth', method: 'post', path: `/register`, handlers: [register] },
  { prefix: 'auth', method: 'post', path: `/login`, handlers: [login] },
  { prefix: 'auth', method: 'get', path: '/me', handlers: [getMe] }
];