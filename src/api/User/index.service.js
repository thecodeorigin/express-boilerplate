const knex = require('../../config/connection');

const getAll = () => knex('users').select('*');

const getOneById = (id) => knex('users').where({ id }).first('*');

const createOne = async (payload) => knex('users').insert(payload);

const patchOne = async (id, payload) =>
  knex('users').where({ id }).update(payload);

const deleteOne = async (id) => knex('users').where({ id }).delete();
const getOneByEmail = (email) => knex('users').where({ email }).first('*');
module.exports = {
  getAll,
  getOneById,
  getOneByEmail,
  createOne,
  patchOne,
  deleteOne,
};
