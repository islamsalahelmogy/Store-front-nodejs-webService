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
const products_1 = require("../../products");
const product_store = new products_1.ProductStore();
describe('Product Model', () => {
    it('getAll method must be defined', () => {
        expect(product_store.getAll).toBeDefined();
    });
    it('Show method must be defined', () => {
        expect(product_store.show).toBeDefined();
    });
    it('Create method must be defined', () => {
        expect(product_store.create).toBeDefined();
    });
    it('Delete method must be defined', () => {
        expect(product_store.delete).toBeDefined();
    });
    it('Create method should add product', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const create_product = yield product_store.create({
                name: 'samsungS5',
                category: 'mobile',
                price: 3000,
            });
            expect(create_product).toEqual({
                id: 1,
                name: 'samsungS5',
                category: 'mobile',
                price: 3000,
            });
        }), 200);
    });
    it('getAll method should retrieve all products', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_products = yield product_store.getAll();
            expect(finded_products).toEqual([
                {
                    id: 1,
                    name: 'samsungS5',
                    category: 'mobile',
                    price: 3000,
                },
            ]);
        }), 290);
    });
    it('Show method should retrieve product', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const finded_product = yield product_store.show(1);
            expect(finded_product).toEqual({
                id: 1,
                name: 'samsungS5',
                category: 'mobile',
                price: 3000,
            });
        }), 290);
    });
    it('Delete method should delete a product', () => {
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield product_store.delete(1);
            const finded_product = yield product_store.getAll();
            expect(finded_product).toEqual([]);
        }), 300);
    });
});
