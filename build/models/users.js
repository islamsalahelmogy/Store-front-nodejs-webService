"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const saltRound = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'INSERT INTO users ("first_name", "last_name", "password") VALUES ($1, $2, $3) RETURNING *';
                const encrypted_pass = yield bcrypt_1.default.hash(user.password + pepper, parseInt(saltRound));
                const result = yield connection.query(sql_statment, [
                    user.first_name,
                    user.last_name,
                    encrypted_pass,
                ]);
                connection.release();
                return result.rows[0].id;
            }
            catch (error) {
                throw new Error(`can not create user ${error}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM users';
                const result = yield connection.query(sql_statment);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get all users ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM users WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                if (!result.rows[0]) {
                    throw new Error(`can not get user id ${id}`);
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not get user id ${id} ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'DELETE FROM users WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not delete user has id ${id} ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
