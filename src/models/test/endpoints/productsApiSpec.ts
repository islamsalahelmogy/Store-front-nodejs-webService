import supertest from 'supertest';
import app from '../../../index';
import { create_account } from '../utils/createUtils';

const request = supertest(app);

describe('Product endpoints response', () => {
  let access_token: string;

  beforeAll(async () => {
    const user = await create_account(request);
    access_token = user;
  });

  it('get all products endpoint and expected to be 200 without token', (done: DoneFn): void => {
    request
      .get('/products')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('create product endpoint and expected to be 200 with token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'dummyname',
          category: 'dummycategory',
          price: 200,
        })
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create product endpoint and expected to be 401 without token', (done: DoneFn): void => {
    request
      .post('/products')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('get specific product endpoint and expected to return product id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/products/1')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.body).toEqual({
            id: 1,
            name: 'dummyname',
            category: 'dummycategory',
            price: 200,
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create product endpoint and expected to be 200 with token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/products/')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'dummy name 2',
          category: 'dummy category 2',
          price: 300,
        })
        .then((response): void => {
          expect(response.body).toEqual({
            id: 3,
            name: 'dummy name 2',
            category: 'dummy category 2',
            price: 300,
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('get products by category founded such(dummycategory) endpoint and expected to return status code 200', (done: DoneFn): void => {
    request
      .get('/products/category/dummycategory')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get products by category not founded such (labtop) and expected to return status code 500', (done: DoneFn): void => {
    request
      .get('/products/category/labtop')
      .then((response): void => {
        expect(response.status).toBe(500);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('delete product endpoint and expected to return status code 200', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/products/1')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });

  it('delete product endpoint and expected to return status code 401', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/products/1')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });
});
