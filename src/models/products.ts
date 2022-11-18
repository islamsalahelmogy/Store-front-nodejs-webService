import Conn from '../database';

export type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
};

export class ProductStore {
  async create(product: Product): Promise<Product> {
    try {
      const connection = await Conn.connect();
      const sql_statment =
        'INSERT INTO products (name,  category, price) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql_statment, [
        product.name,
        product.category,
        product.price,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not create product ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not get product id ${id} ${error}`);
    }
  }

  async getAll(): Promise<Product[]> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM products';
      const result = await connection.query(sql_statment);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`can not get all products ${error}`);
    }
  }

  async getProductByCategory(category_name: string): Promise<Product> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM products WHERE category = ($1)';
      const result = await connection.query(sql_statment, [category_name]);
      connection.release();
      if (!result.rows[0]) {
        throw new Error(`can not get products ${category_name}`);
      }
      return result.rows;
    } catch (error) {
      throw new Error(`can not get products ${error}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'DELETE FROM products WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not delete product id ${id} ${error}`);
    }
  }
}
