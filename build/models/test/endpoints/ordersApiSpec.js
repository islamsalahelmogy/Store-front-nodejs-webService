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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../../index"));
const createUtils_1 = require("../utils/createUtils");
const request = (0, supertest_1.default)(index_1.default);
describe('Orders endpoints response', () => {
    let order;
    let access_token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user_created = yield (0, createUtils_1.create_account)(request);
        access_token = user_created;
        const order_created = yield (0, createUtils_1.create_order)(request, 'active');
        order = order_created;
        yield (0, createUtils_1.create_product)(request);
    }));
    it('get all orders endpoint and expected to be 401 without token', (done) => {
        setTimeout(() => {
            request
                .get('/orders')
                .then((response) => {
                expect(response.status).toBe(401);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('get all products endpoint and expected to be 200 with token', (done) => {
        setTimeout(() => {
            request
                .get('/orders')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('create order endpoint and expected to be 401 without token', (done) => {
        setTimeout(() => {
            request
                .post('/orders')
                .then((response) => {
                expect(response.status).toBe(401);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('create order endpoint and expected to be 200 with token', (done) => {
        setTimeout(() => {
            request
                .post('/orders')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                user_id: 1,
            })
                .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('get specific order endpoint and expected to return order id 1', (done) => {
        setTimeout(() => {
            request
                .get('/orders/1')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.body).toEqual(order);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('create product assigned to order endpoint and expected to return a product with order details', (done) => {
        setTimeout(() => {
            request
                .post('/orders/1/product')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                order_id: 1,
                product_id: 1,
                quantity: 1,
            })
                .then((response) => {
                expect(response.body).toEqual({
                    id: 1,
                    product_id: '1',
                    order_id: '1',
                    quantity: 1,
                });
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('get order endpoint and expected to return orders for user id 1', (done) => {
        setTimeout(() => {
            request
                .get('/orders/user/1')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.body).toEqual([
                    {
                        id: 1,
                        user_id: '1',
                        order_id: '1',
                        product_id: '1',
                        quantity: 1,
                    },
                ]);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('delete order endpoint and expected to return status code 200', (done) => {
        setTimeout(() => {
            request
                .delete('/orders/1')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
                .catch((err) => console.log(err));
        }, 600);
    });
    it('delete order endpoint and expected to return status code 401', (done) => {
        setTimeout(() => {
            request
                .delete('/orders/1')
                .then((response) => {
                expect(response.status).toBe(401);
                done();
            })
                .catch((err) => console.log(err));
        }, 600);
    });
});
