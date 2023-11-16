const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../app');

dotenv.config();

describe('API Login', () => {
  it('success login', async () => {
    const user = {
      email: 'fikri@binar.co.id',
      password: '123456',
    };
    const response = await request(app).post('/v1/auth/login').send(user);
    expect(response.statusCode).toBe(201);
  });

  it('failed login : wrong password', async () => {
    const failedUser = {
      email: 'fikri@binar.co.id',
      password: '1234656',
    };
    const response = await request(app).post('/v1/auth/login').send(failedUser);
    expect(response.statusCode).toBe(401);
  });
});

describe('API Register', () => {
  let userid;
  it('success register', async () => {
    const user = {
      name: 'Maul',
      email: 'kaimamganteng12@binar.co.id',
      password: '123456',
    };
    const response = await request(app).post('/v1/auth/register').send(user);
    expect(response.statusCode).toBe(201);
    userid = response.body.user.id;
    console.log(userid);
  });

  it('failed register : email has already been taken', async () => {
    const failedUser = {
      name: 'Imam',
      email: 'kaimamganteng12@binar.co.id',
      password: '1234656',
    };
    const response = await request(app)
      .post('/v1/auth/register')
      .send(failedUser);
    expect(response.statusCode).toBe(422);
  });

  afterAll(async () => {
    const deleteResponse = await request(app).delete(
      `/v1/auth/users/${userid}`,
    );
    expect(deleteResponse.statusCode).toBe(200);
  });
});
