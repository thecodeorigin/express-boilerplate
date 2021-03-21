const roles = require('../../constants/roles');
exports.seed = function(knex) {
  return knex('roles_permissions').del()
    .then(async function () {
      const roles_permissions = [];
      // Map role and permission to id in table
      const data = await Promise.all(roles.map(async (role) => {
        const role_id = await knex('roles')
          .where('name', role.name)
          .first('id');
        const permissions = await knex('permissions')
          .whereIn('name', role.permissions)
          .select('id');
        return permissions.map(permission_id => ({ role_id: role_id.id, permission_id: permission_id.id }))
      }));
      // Map data into insertable data
      return knex('roles_permissions').insert(data.flat());
    });
};
