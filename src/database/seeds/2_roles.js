const roles = require('../../constants/roles');
exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      const data = roles.map(role => ({ name: role.name }));
      return knex('roles').insert(data);
    });
};
