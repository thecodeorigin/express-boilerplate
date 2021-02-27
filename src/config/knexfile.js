require('dotenv').config({ path: __dirname + '/../../.env' });
module.exports = {
  development: {
    client: process.env.DB_TYPE,
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      database : process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/../database/migrations',
    },
    seeds: {
      directory: __dirname + '/../database/seeds'
    }
  }
};