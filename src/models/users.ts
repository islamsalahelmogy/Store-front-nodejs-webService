import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Conn from '../database';

dotenv.config();

const saltRound = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
};
export class UserStore {
  async create(user: User): Promise<User> {
    try {
      const connection = await Conn.connect();
      const sql_statment =
        'INSERT INTO users ("first_name", "last_name", "password") VALUES ($1, $2, $3) RETURNING *';

      const encrypted_pass = await bcrypt.hash(
        user.password + pepper,
        parseInt(saltRound as unknown as string)
      );

      const result = await connection.query(sql_statment, [
        user.first_name,
        user.last_name,
        encrypted_pass,
      ]);

      connection.release();

      return result.rows[0].id;
    } catch (error) {
      throw new Error(`can not create user ${error}`);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM users';
      const result = await connection.query(sql_statment);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`can not get all users ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      if (!result.rows[0]) {
        throw new Error(`can not get user id ${id}`);
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not get user id ${id} ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const connection = await Conn.connect();
      const sql_statment = 'DELETE FROM users WHERE id=($1)';
      const result = await connection.query(sql_statment, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`can not delete user has id ${id} ${error}`);
    }
  }
}
