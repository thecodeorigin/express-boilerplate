const { isNotEmpty, isEmail } = require('../../common/filters/validation');
const { routerGroup } = require('../../common/helpers/routerGroup');
const { register, login, getMe } = require('./index.controller');

module.exports = routerGroup(
  {
    name: 'auth',
    prefix: '/auth',
  },
  [
    {
      method: 'post',
      path: '/register',
      handlers: [
        isNotEmpty('email'),
        isEmail('email'),
        isNotEmpty('name'),
        isNotEmpty('password'),
        register,
      ],
    },
    {
      method: 'post',
      path: '/login',
      handlers: [
        isNotEmpty('email'),
        isEmail('email'),
        isNotEmpty('password'),
        login,
      ],
    },
    {
      method: 'get',
      path: '/me',
      handlers: [getMe],
    },
  ]
);
