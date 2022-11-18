import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_HOST_TEST,
  DB_NAME_TEST,
  DB_PORT,
  DB_PASSWORD,
  ENV,
} = process.env;

let database;

if (ENV === 'test' || process.env.ENV) {
  database = new Pool({
    host: DB_HOST_TEST,
    database: DB_NAME_TEST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT as string),
  });
}

if (ENV === 'dev') {
  database = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT as string),
  });
}

export default database;
