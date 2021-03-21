const { routerGroup } = require('../../common/helpers/routerGroup');
const {register, login, getMe} = require('./index.controller');

module.exports = routerGroup({
  name: 'auth',
  prefix: '/auth',
},
[
  { 
    method: 'post',
    path: '/register',
    handlers: [register] 
  },
  {
    method: 'post',
    path: '/login',
    handlers: [login],
  },
  { 
    method: 'get',
    path: '/me',
    handlers: [getMe] 
  },
]);
