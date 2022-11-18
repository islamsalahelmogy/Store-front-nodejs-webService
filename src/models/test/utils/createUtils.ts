import { SuperTest, Test } from 'supertest';
import { Order } from '../../orders';
import { Product } from '../../products';

let token: string;

const create_account = async (request: SuperTest<Test>): Promise<string> => {
  const signUp = await request.post('/users/signup').send({
    first_name: 'Islam',
    last_name: 'Elmogy',
    password: '112233',
  });
  token = signUp.body;
  return signUp.body;
};

const create_product = async (request: SuperTest<Test>): Promise<Product> => {
  const new_order = await request
    .post('/products/')
    .send({
      name: 'dummyname',
      category: 'dummycategory',
      price: 200,
    })
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  return new_order.body;
};

const create_order = async (
  request: SuperTest<Test>,
  status: string
): Promise<Order> => {
  const new_order = await request
    .post('/orders/')
    .send({
      user_id: 1,
    })
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  return new_order.body;
};

export { create_account, create_product, create_order };
