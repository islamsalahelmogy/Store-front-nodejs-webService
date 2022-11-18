import supertest from 'supertest';
import app from '../../../index';
import { create_account } from '../utils/createUtils';
const request = supertest(app);

describe('User endpoints response', () => {
  let access_token: string;

  beforeAll(async () => {
    const user = await create_account(request);
    access_token = user;
  });

  it('get all users endpoint expected to be 200 with valid token', (done: DoneFn): void => {
    request
      .get('/users')
      .set('Authorization', `Bearer ${access_token}`)
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('get all users endpoint expected to be 401 with no token', (done: DoneFn): void => {
    request
      .get('/users')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('get specific user endpoint expected to be 401 with no token', (done: DoneFn): void => {
    request
      .get('/users/1')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get specific user endpoint expected to be 200 with valid token', (done: DoneFn): void => {
    request
      .get('/users/1')
      .set('Authorization', `Bearer ${access_token}`)
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('signup endpoint expected to be 200', (done: DoneFn): void => {
    request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Islam',
        lastName: 'Elmogy',
        password: '226699',
      })
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('delete user endpoint and expected to return status code 200', (done: DoneFn): void => {
    request
      .delete('/users/1')
      .set('Authorization', `Bearer ${access_token}`)
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('delete user endpoint and expected to return status code 401 without token', (done: DoneFn): void => {
    request
      .delete('/users/1')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
});
