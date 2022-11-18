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
describe('User endpoints response', () => {
    let access_token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, createUtils_1.create_account)(request);
        access_token = user;
    }));
    it('get all users endpoint expected to be 200 with valid token', (done) => {
        request
            .get('/users')
            .set('Authorization', `Bearer ${access_token}`)
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('get all users endpoint expected to be 401 with no token', (done) => {
        request
            .get('/users')
            .then((response) => {
            expect(response.status).toBe(401);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('get specific user endpoint expected to be 401 with no token', (done) => {
        request
            .get('/users/1')
            .then((response) => {
            expect(response.status).toBe(401);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('get specific user endpoint expected to be 200 with valid token', (done) => {
        request
            .get('/users/1')
            .set('Authorization', `Bearer ${access_token}`)
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('signup endpoint expected to be 200', (done) => {
        request
            .post('/users/signup')
            .set('Content-Type', 'application/json')
            .send({
            firstName: 'Islam',
            lastName: 'Elmogy',
            password: '226699',
        })
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('delete user endpoint and expected to return status code 200', (done) => {
        request
            .delete('/users/1')
            .set('Authorization', `Bearer ${access_token}`)
            .then((response) => {
            expect(response.status).toBe(200);
            done();
        })
            .catch((err) => console.log(err));
    });
    it('delete user endpoint and expected to return status code 401 without token', (done) => {
        request
            .delete('/users/1')
            .then((response) => {
            expect(response.status).toBe(401);
            done();
        })
            .catch((err) => console.log(err));
    });
});
