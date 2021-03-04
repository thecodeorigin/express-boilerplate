const {register, login} = require('./index.controller');

module.exports = [
  { prefix: 'auth', method: 'post', path: `/register`, handlers: [register] },
  { prefix: 'auth', method: 'patch', path: `/login`, handlers: [login] },
];