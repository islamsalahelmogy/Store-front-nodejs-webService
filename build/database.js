"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_USERNAME, DB_HOST_TEST, DB_NAME_TEST, DB_PORT, DB_PASSWORD, ENV, } = process.env;
let database;
if (ENV === 'test' || process.env.ENV) {
    database = new pg_1.Pool({
        host: DB_HOST_TEST,
        database: DB_NAME_TEST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        port: parseInt(DB_PORT),
    });
}
if (ENV === 'dev') {
    database = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        port: parseInt(DB_PORT),
    });
}
exports.default = database;
