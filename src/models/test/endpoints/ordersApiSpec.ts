import supertest from 'supertest';
import app from '../../../index';
import { Order } from '../../orders';
import {
  create_account,
  create_product,
  create_order,
} from '../utils/createUtils';

const request = supertest(app);

describe('Orders endpoints response', () => {
  let order: Order;
  let access_token: string;

  beforeAll(async () => {
    const user_created = await create_account(request);
    access_token = user_created;
    const order_created = await create_order(request, 'active');
    order = order_created;
    await create_product(request);
  });

  it('get all orders endpoint and expected to be 401 without token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('get all products endpoint and expected to be 200 with token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create order endpoint and expected to be 401 without token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('create order endpoint and expected to be 200 with token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          user_id: 1,
        })
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('get specific order endpoint and expected to return order id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders/1')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.body).toEqual(order);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create product assigned to order endpoint and expected to return a product with order details', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders/1/product')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 1,
        })
        .then((response): void => {
          expect(response.body).toEqual({
            id: 1,
            product_id: '1',
            order_id: '1',
            quantity: 1,
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('get order endpoint and expected to return orders for user id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders/user/1')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.body).toEqual([
            {
              id: 1,
              user_id: '1',
              order_id: '1',
              product_id: '1',
              quantity: 1,
            },
          ]);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('delete order endpoint and expected to return status code 200', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/orders/1')
        .set('Authorization', `Bearer ${access_token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });

  it('delete order endpoint and expected to return status code 401', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/orders/1')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });
});
