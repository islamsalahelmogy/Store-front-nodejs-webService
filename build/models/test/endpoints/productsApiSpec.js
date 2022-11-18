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
describe('Product endpoints response', () => {
    let access_token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, createUtils_1.create_account)(request);
        access_token = user;
    }));
    it('get all products endpoint and expected to be 200 without token', (done) => {
        request
            .get('/products')
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('create product endpoint and expected to be 200 with token', (done) => {
        setTimeout(() => {
            request
                .post('/products')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                name: 'dummyname',
                category: 'dummycategory',
                price: 200,
            })
                .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('create product endpoint and expected to be 401 without token', (done) => {
        request
            .post('/products')
            .then((response) => {
            expect(response.status).toBe(401);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('get specific product endpoint and expected to return product id 1', (done) => {
        setTimeout(() => {
            request
                .get('/products/1')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.body).toEqual({
                    id: 1,
                    name: 'dummyname',
                    category: 'dummycategory',
                    price: 200,
                });
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('create product endpoint and expected to be 200 with token', (done) => {
        setTimeout(() => {
            request
                .post('/products/')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                name: 'dummy name 2',
                category: 'dummy category 2',
                price: 300,
            })
                .then((response) => {
                expect(response.body).toEqual({
                    id: 3,
                    name: 'dummy name 2',
                    category: 'dummy category 2',
                    price: 300,
                });
                done();
            })
                .catch((err) => console.log(err));
        });
    });
    it('get products by category founded such(dummycategory) endpoint and expected to return status code 200', (done) => {
        request
            .get('/products/category/dummycategory')
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('get products by category not founded such (labtop) and expected to return status code 500', (done) => {
        request
            .get('/products/category/labtop')
            .then((response) => {
            expect(response.status).toBe(500);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('delete product endpoint and expected to return status code 200', (done) => {
        setTimeout(() => {
            request
                .delete('/products/1')
                .set('Authorization', `Bearer ${access_token}`)
                .then((response) => {
                expect(response.status).toBe(200);
                done();
            })
                .catch((err) => console.log(err));
        }, 600);
    });
    it('delete product endpoint and expected to return status code 401', (done) => {
        setTimeout(() => {
            request
                .delete('/products/1')
                .then((response) => {
                expect(response.status).toBe(401);
                done();
            })
                .catch((err) => console.log(err));
        }, 600);
    });
});
