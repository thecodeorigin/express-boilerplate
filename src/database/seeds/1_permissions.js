const permissions = require('../../constants/permissions');
exports.seed = function(knex) {
  return knex('permissions').del()
    .then(function () {
      const data = permissions.map(name => ({ name }));
      return knex('permissions').insert(data);
    });
};
