const request = require('supertest');
const server = require('../app');
const knex = require('../src/config/connection');

describe("/users endpoint", () => {
  test('GET /users should return 400 if user is not logged in', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(400);
    done();
  });
  test('GET /users/:id should return 400 if user is not logged in', async (done) => {
    const id = 1;
    const response = await request(server).get(`/v1/users/${id}`);
    expect(response.statusCode).toBe(400);
    done();
  });
  test('GET /users should return 400 if user is not logged in', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(400);
    done();
  });
  test('GET /users should return 400 if user is not logged in', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(400);
    done();
  });
  test('GET /users should return 400 if user is not logged in', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(400);
    done();
  });
  afterEach(() => {
    knex.destroy();
    server.close();
  });
});