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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'INSERT INTO products (name,  category, price) VALUES ($1, $2, $3) RETURNING *';
                const result = yield connection.query(sql_statment, [
                    product.name,
                    product.category,
                    product.price,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not create product ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM products WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not get product id ${id} ${error}`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM products';
                const result = yield connection.query(sql_statment);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get all products ${error}`);
            }
        });
    }
    getProductByCategory(category_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'SELECT * FROM products WHERE category = ($1)';
                const result = yield connection.query(sql_statment, [category_name]);
                connection.release();
                if (!result.rows[0]) {
                    throw new Error(`can not get products ${category_name}`);
                }
                return result.rows;
            }
            catch (error) {
                throw new Error(`can not get products ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql_statment = 'DELETE FROM products WHERE id=($1)';
                const result = yield connection.query(sql_statment, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`can not delete product id ${id} ${error}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
