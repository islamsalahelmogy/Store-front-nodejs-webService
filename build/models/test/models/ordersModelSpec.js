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
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../orders");
const products_1 = require("../../products");
const users_1 = require("../../users");
const user_store = new users_1.UserStore();
const product_store = new products_1.ProductStore();
const order_store = new orders_1.OrderStore();
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
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield product_store.create({
                name: 'Ryzen5 processor',
                price: 5000,
                category: 'computer ',
            });
            yield user_store.create({
                first_name: 'Islam',
                last_name: 'Elmogy',
                password: '226699',
            });
            const create_order = yield order_store.create(1);
            expect(create_order).toEqual({
                id: 1,
                user_id: 1,
            });
        }), 200);
    });
    it('Add product method add products to an order', () => __awaiter(void 0, void 0, void 0, function* () {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const create_order = yield order_store.addProduct(1, 1, 3);
            expect(create_order).toEqual({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 1,
            });
        }), 220);
    }));
    it('Show user orders method retrieve user orders', () => __awaiter(void 0, void 0, void 0, function* () {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_order = yield order_store.getUserOrders('1');
            expect(finded_order).toEqual({
                id: 1,
                user_id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 1,
            });
        }), 230);
    }));
    it('getAll method retrieve all orders', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_orders = yield order_store.getAll();
            expect(finded_orders).toEqual([
                {
                    id: 1,
                    user_id: 1,
                },
            ]);
        }), 290);
    });
    it('Show method should retrieve an order', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_order = yield order_store.show('1');
            expect(finded_order).toEqual({
                id: 1,
                user_id: 1,
            });
        }), 290);
    });
    it('Delete method should delete an order', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield order_store.delete('1');
            const finded_order = yield order_store.getAll();
            expect(finded_order).toEqual([]);
        }), 300);
    });
});
