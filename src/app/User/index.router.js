const {getAll, getOne, createOne, patchOne, deleteOne} = require('./index.controller');

module.exports = [
  { prefix: 'users', method: 'get', path: '/', handlers: [getAll] },
  { prefix: 'users', method: 'get', path: '/:id', handlers: [getOne] },
  { prefix: 'users', method: 'post', path: '/', handlers: [createOne] },
  { prefix: 'users', method: 'patch', path: '/:id', handlers: [patchOne] },
  { prefix: 'users', method: 'delete', path: '/:id', handlers: [deleteOne] },
];