const request = require('supertest');
const server = require('../app');
const knex = require('../src/config/connection');

describe("Users' endpoint", () => {
  beforeAll(() => {
    server.close();
  });

  it('should respond with code status 200 with data', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    done();
  });

  afterAll(() => {
    knex.destroy();
    server.close();
  });
});