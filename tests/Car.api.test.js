const request = require('supertest');
const app = require('../app');
// const baseURL = "http://localhost:8000"
const dotenv = require('dotenv');
dotenv.config();

// describe("Dog", () => {
//     it("should have name called 'Arnold'", () => {
//         const dog = new Dog("Arnold");

//         expect(dog).toHaveProperty("name", "Arnold");
//     });

//     it("should be able to bark and return 'Woof!'", () => {
//         const dog = new Dog("Arnold");
//         expect(dog.bark()).toEqual("Woof!");
//     });
// });

describe('/home/irfiyanda/Documents/studi-independen-binar/Daily-Task-CH7-11-13-2023/tests/Car.api.test.js', () => {
  let customerToken;
  let adminToken;
  let carData;
  beforeAll(async () => {
    const loginCustomer = await request(app).post('/v1/auth/login').send({
      email: 'johnny@binar.co.id',
      password: '123456',
    });
    customerToken = loginCustomer.body.accessToken;

    const adminCustomer = await request(app).post('/v1/auth/login').send({
      email: 'ranggawarsita@binar.co.id',
      password: '123456',
    });
    adminToken = adminCustomer.body.accessToken;
  });

  describe('API get all cars', () => {
    it('success get all data cars', (done) => {
      request(app).get('/v1/cars').expect(200, done);
    });
  });

  describe('API get all cars', () => {
    it('success get all data cars', async () => {
      const response = await request(app).get('/v1/cars');
      carData = response.body.cars[0];
      expect(response.statusCode).toBe(200);
    });
  });

  describe('API get car By ID', () => {
    it('success get data car', async () => {
      const response = await request(app).get('/v1/cars/20');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('API post new car', () => {
    it('Success post new car', async () => {
      const newCar = {
        name: 'Ertiga 2023',
        price: 400000000,
        size: 'MEDIUM',
        image: 'https://source.unsplash.com/504x504',
      };
      const response = await request(app)
        .post('/v1/cars')
        .send(newCar)
        .set('authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(newCar.name);
      expect(response.body.price).toBe(newCar.price);
      expect(response.body.size).toBe(newCar.size);
      expect(response.body.image).toBe(newCar.image);
    });

    it('Fail post new car input required', async () => {
      const newCar = {
        name: '',
        price: 400000000,
        size: 'MEDIUM',
        image: 'https://source.unsplash.com/504x504',
      };
      const response = await request(app)
        .post('/v1/cars')
        .send(newCar)
        .set('authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.error.message).toBe(
        'name, price, size, image are required!'
      );
      expect(response.body.error.details).toEqual({
        fields: ['name', 'price', 'size', 'image'],
      });
    });
  });

  describe('API post rent car', () => {
    it('success post rent car', async () => {
      const rentStartedAt = '2023-11-14T08:30:00.000Z';
      const rentEndedAt = '2023-11-16T08:30:00.000Z';
      const response = await request(app)
        .post(`/v1/cars/${carData.id}/rent`)
        .send({
          rentStartedAt,
          rentEndedAt,
        })
        .set('authorization', `Bearer ${customerToken}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.rentStartedAt).toBe(rentStartedAt);
      expect(response.body.rentEndedAt).toBe(rentEndedAt);
    });

    it('Admin access forbidden post rent car', async () => {
      const rentStartedAt = '2023-11-14T08:30:00.000Z';
      const rentEndedAt = '2023-11-16T08:30:00.000Z';
      const response = await request(app)
        .post(`/v1/cars/${carData.id}/rent`)
        .send({
          rentStartedAt,
          rentEndedAt,
        })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(401);
      expect(response.body.error.message).toBe('Access forbidden!');
    });

    it('fail post rent car, car was rented', async () => {
      const rentStartedAt = '2023-11-14T08:30:00.000Z';
      const rentEndedAt = '2023-11-16T08:30:00.000Z';
      const response = await request(app)
        .post(`/v1/cars/${carData.id}/rent`)
        .send({
          rentStartedAt,
          rentEndedAt,
        })
        .set('authorization', `Bearer ${customerToken}`);

      expect(response.statusCode).toBe(422);
      expect(response.body.error.message).toBe(
        `${carData.name} is already rented!!`
      );
    });
  });
  describe("API delete car By ID", () => {
    it("success delete data car", async () => {
      const response = await request(app)
        .delete(`/v1/cars/20`)
        .set("authorization", `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(204);
    });

    it("forbid deletion by customer", async () => {
      const response = await request(app)
        .delete(`/v1/cars/20`)
        .set("authorization", `Bearer ${customerToken}`);

      expect(response.statusCode).toBe(401);
      expect(response.body.error.message).toBe("Access forbidden!");
    });
  });
});
