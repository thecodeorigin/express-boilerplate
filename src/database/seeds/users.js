const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const users = [];
      for (let i = 0; i < 100; i++) {
        const email = faker.internet.email();
        const name = faker.name.findName();
        const password = '123456';
        users.push({ email, name, password });
      }
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
