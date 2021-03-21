
exports.up = function(knex) {
  return knex.schema.createTable('roles_permissions', (table) => {
    table.increments('id').primary();
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('roles.id').onDelete('CASCADE');
    table.integer('permission_id').unsigned();
    table.foreign('permission_id').references('permissions.id').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles_permissions');
};
