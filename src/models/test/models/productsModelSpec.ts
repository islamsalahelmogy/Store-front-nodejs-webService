import { ProductStore } from '../../products';

const product_store = new ProductStore();

describe('Product Model', () => {
  it('getAll method must be defined', () => {
    expect(product_store.getAll).toBeDefined();
  });
  it('Show method must be defined', () => {
    expect(product_store.show).toBeDefined();
  });
  it('Create method must be defined', () => {
    expect(product_store.create).toBeDefined();
  });
  it('Delete method must be defined', () => {
    expect(product_store.delete).toBeDefined();
  });

  it('Create method should add product', () => {
    setTimeout(async () => {
      const create_product = await product_store.create({
        name: 'samsungS5',
        category: 'mobile',
        price: 3000,
      });
      expect(create_product).toEqual({
        id: 1,
        name: 'samsungS5',
        category: 'mobile',
        price: 3000,
      });
    }, 200);
  });

  it('getAll method should retrieve all products', () => {
    setTimeout(async () => {
      const finded_products = await product_store.getAll();
      expect(finded_products).toEqual([
        {
          id: 1,
          name: 'samsungS5',
          category: 'mobile',
          price: 3000,
        },
      ]);
    }, 290);
  });

  it('Show method should retrieve product', () => {
    setTimeout(async () => {
      const finded_product = await product_store.show(1);
      expect(finded_product).toEqual({
        id: 1,
        name: 'samsungS5',
        category: 'mobile',
        price: 3000,
      });
    }, 290);
  });

  it('Delete method should delete a product', () => {
    setTimeout(async () => {
      await product_store.delete(1);
      const finded_product = await product_store.getAll();
      expect(finded_product).toEqual([]);
    }, 300);
  });
});
