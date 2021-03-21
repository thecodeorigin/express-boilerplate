const { authentication } = require('../../common/guards/authentication');
const { routerGroup } = require('../../common/helpers/routerGroup');
const {getAll, getOne, createOne, patchOne, deleteOne} = require('./index.controller');

module.exports = routerGroup({
  name: 'users',
  prefix: '/users',
},
[
  { 
    method: 'get',
    path: '/',
    handlers: [authentication, getAll] 
  },
  {
    method: 'get',
    path: '/:id',
    handlers: [getOne],
  },
  { 
    method: 'post',
    path: '/',
    handlers: [createOne] 
  },
  { 
    method: 'patch',
    path: '/',
    handlers: [patchOne] 
  },
  { 
    method: 'delete',
    path: '/',
    handlers: [deleteOne] 
  },
]);
