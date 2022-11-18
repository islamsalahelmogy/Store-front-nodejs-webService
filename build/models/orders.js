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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                if (!result.rows[0]) {
                    throw new Error(`order id ${id} NOT FOUND`);
                }
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not get order id=> ${id} ${error}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM orders';
                const result = yield connection.query(sql_statment);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get all orders ${error}`);
            }
        });
    }
    getUserOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM orders INNER JOIN order_products ON order_id = orders.id WHERE user_id=($1)';
                const result = yield connection.query(sql_statment, [user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get orders for user ${user_id} ${error}`);
            }
        });
    }
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'INSERT INTO orders (user_id) VALUES ($1) RETURNING *';
                const result = yield connection.query(sql_statment, [user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not create order ${error}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM orders WHERE id=($1)';
                yield connection.query(sql_statment, [order_id]);
                connection.release();
            }
            catch (error) {
                throw new Error(`${error}`);
            }
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                const result = yield connection.query(sql_statment, [
                    order_id,
                    product_id,
                    quantity,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not add product to order ${order_id}, product ${product_id}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'DELETE FROM orders WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not delete order ${id} ${error}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
