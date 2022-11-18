import Conn from '../database';

export type Order = {
  id?: number;
  product_id?: number;
  quantity?: number;
  user_id: number;
};

export class OrderStore {
  async show(id: string): Promise<Order> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      if (!result.rows[0]) {
        throw new Error(`order id ${id} NOT FOUND`);
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not get order id=> ${id} ${error}`);
    }
  }

  async getAll(): Promise<Order[]> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM orders';
      const result = await connection.query(sql_statment);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can not get all orders ${error}`);
    }
  }

  async getUserOrders(user_id: string): Promise<Order> {
    try {
      const connection = await Conn.connect();
      const sql_statment =
        'SELECT * FROM orders INNER JOIN order_products ON order_id = orders.id WHERE user_id=($1)';
      const result = await connection.query(sql_statment, [user_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can not get orders for user ${user_id} ${error}`);
    }
  }

  async create(user_id: number): Promise<[]> {
    try {
      const connection = await Conn.connect();
      const sql_statment =
        'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
      const result = await connection.query(sql_statment, [user_id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not create order ${error}`);
    }
  }

  async addProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<Order> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM orders WHERE id=($1)';
      await connection.query(sql_statment, [order_id]);
      connection.release();
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      const connection = await Conn.connect();
      const sql_statment =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql_statment, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can not add product to order ${order_id}, product ${product_id}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'DELETE FROM orders WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not delete order ${id} ${error}`);
    }
  }
}
