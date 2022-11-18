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
exports.create_order = exports.create_product = exports.create_account = void 0;
let token;
const create_account = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const signUp = yield request.post('/users/signup').send({
        first_name: 'Islam',
        last_name: 'Elmogy',
        password: '112233',
    });
    token = signUp.body;
    return signUp.body;
});
exports.create_account = create_account;
const create_product = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const new_order = yield request
        .post('/products/')
        .send({
        name: 'Samsung',
        category: 'mobile phone',
        price: 3000,
    })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
    return new_order.body;
});
exports.create_product = create_product;
const create_order = (request, status) => __awaiter(void 0, void 0, void 0, function* () {
    const new_order = yield request
        .post('/orders/')
        .send({
        user_id: 1,
    })
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
    return new_order.body;
});
exports.create_order = create_order;
