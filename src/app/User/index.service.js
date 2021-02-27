const knex = require('../../config/connection');

const getAll = () => {
  return knex('users').select('*');
};

const getOneById = (id) => {
  return knex('users').where({ id }).first('*');
};

const createOne = async (email, name) => {
  return knex('users').insert({ email, name });
};

const patchOne = async (id, email, name) => {
  return knex('users').where({ id }).update({
    email: email ? email : user.email,
    name: name ? name : user.name 
  });
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