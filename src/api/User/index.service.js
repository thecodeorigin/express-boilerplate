const knex = require('../../config/connection');

const getAll = () => {
  return knex('users').select('*');
};

const getOneById = (id) => {
  return knex('users').where({ id }).first('*');
};

const createOne = async (payload) => {
  return knex('users').insert(payload);
};

const patchOne = async (id, payload) => {
  return knex('users').where({ id }).update(payload);
};

const deleteOne = async (id) => {
  return knex('users').where({ id }).delete();
};
const getOneByEmail = (email) => {
  return knex('users').where({ email }).first('*');
}
module.exports = {
  getAll,
  getOneById,
  getOneByEmail,
  createOne,
  patchOne,
  deleteOne,
};