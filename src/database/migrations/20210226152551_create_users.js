exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments().primary();
    table.string('email').unique();
    table.string('name');
    table.string('password');
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('roles.id').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};