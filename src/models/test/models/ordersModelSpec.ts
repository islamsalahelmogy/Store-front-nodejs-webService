import { OrderStore } from '../../orders';
import { ProductStore } from '../../products';
import { UserStore } from '../../users';

const user_store = new UserStore();
const product_store = new ProductStore();
const order_store = new OrderStore();

describe('Order Model', () => {
  it('Index method must defined', () => {
    expect(order_store.getAll).toBeDefined();
  });
  it('Create method must defined', () => {
    expect(order_store.create).toBeDefined();
  });
  it('Show method must defined', () => {
    expect(order_store.show).toBeDefined();
  });
  it('Delete method must defined', () => {
    expect(order_store.delete).toBeDefined();
  });

  it('Create method add a new order', () => {
    setTimeout(async () => {
      await product_store.create({
        name: 'Ryzen5 processor',
        price: 5000,
        category: 'computer ',
      });
      await user_store.create({
        first_name: 'Islam',
        last_name: 'Elmogy',
        password: '226699',
      });
      const create_order: unknown = await order_store.create(1);
      expect(create_order).toEqual({
        id: 1,
        user_id: 1,
      });
    }, 200);
  });

  it('Add product method add products to an order', async () => {
    setTimeout(async () => {
      const create_order: unknown = await order_store.addProduct(1, 1, 3);
      expect(create_order).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 1,
      });
    }, 220);
  });

  it('Show user orders method retrieve user orders', async () => {
    setTimeout(async () => {
      const finded_order: unknown = await order_store.getUserOrders('1');
      expect(finded_order).toEqual({
        id: 1,
        user_id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 1,
      });
    }, 230);
  });

  it('getAll method retrieve all orders', () => {
    setTimeout(async () => {
      const finded_orders: unknown = await order_store.getAll();
      expect(finded_orders).toEqual([
        {
          id: 1,
          user_id: 1,
        },
      ]);
    }, 290);
  });

  it('Show method should retrieve an order', () => {
    setTimeout(async () => {
      const finded_order: unknown = await order_store.show('1');
      expect(finded_order).toEqual({
        id: 1,
        user_id: 1,
      });
    }, 290);
  });

  it('Delete method should delete an order', () => {
    setTimeout(async () => {
      await order_store.delete('1');
      const finded_order = await order_store.getAll();
      expect(finded_order).toEqual([]);
    }, 300);
  });
});
