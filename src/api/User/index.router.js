const { authentication } = require('../../common/guards/authentication');
const { routerGroup } = require('../../common/helpers/routerGroup');
const {getAll, getOne, createOne, patchOne, deleteOne} = require('./index.controller');
const {isNotEmpty, isEmail} = require('../../common/filters/validation');
module.exports = routerGroup({
  name: 'users',
  prefix: '/users',
},
[
  { 
    method: 'get',
    path: '/',
    handlers: [
      authentication,
      getAll
    ] 
  },
  {
    method: 'get',
    path: '/:id',
    handlers: [
      authentication,
      getOne
    ],
  },
  { 
    method: 'post',
    path: '/',
    handlers: [
      authentication,
      isNotEmpty('email'),
      isEmail('email'),
      isNotEmpty('name'),
      isNotEmpty('password'),
      createOne
    ],
  },
  { 
    method: 'patch',
    path: '/:id',
    handlers: [
      authentication,
      isNotEmpty('email', true),
      isEmail('email', true),
      isNotEmpty('name', true),
      isNotEmpty('password', true),
      patchOne
    ] 
  },
  { 
    method: 'delete',
    path: '/:id',
    handlers: [
      authentication,
      deleteOne
    ] 
  },
]);
