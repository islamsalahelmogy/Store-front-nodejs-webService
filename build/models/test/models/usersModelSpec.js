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
const users_1 = require("../../users");
const user_store = new users_1.UserStore();
describe('Users Model', () => {
    it('getAll method must defined', () => {
        expect(user_store.getAll).toBeDefined();
    });
    it('Show method must defined', () => {
        expect(user_store.show).toBeDefined();
    });
    it('Create method must defined', () => {
        expect(user_store.create).toBeDefined();
    });
    it('Delete method must defined', () => {
        expect(user_store.delete).toBeDefined();
    });
    it('Create method should add user', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const create_user = yield user_store.create({
                first_name: 'Islam',
                last_name: 'Elmogy',
                password: '226699',
            });
            expect(create_user).toEqual({
                id: 1,
                first_name: 'Islam',
                last_name: 'Elmogy',
                password: '226699',
            });
        }), 100);
    });
    it('getAll method should retrieve all users', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_users = yield user_store.getAll();
            expect(finded_users).toEqual([
                {
                    id: 1,
                    first_name: 'Islam',
                    last_name: 'Elmogy',
                    password: '226699',
                },
            ]);
        }), 90);
    });
    it('Show method should retrieve user', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_users = yield user_store.show(1);
            expect(finded_users).toEqual({
                id: 1,
                first_name: 'Islam',
                last_name: 'Elmogy',
                password: '226699',
            });
        }), 90);
    });
    it('Delete method should delete user', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_store.delete(1);
            const finded_users = yield user_store.getAll();
            expect(finded_users).toEqual([]);
        }), 150);
    });
});
