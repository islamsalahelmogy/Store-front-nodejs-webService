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
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const products_1 = require("../models/products");
const product = new products_1.ProductStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productsFinded = yield product.getAll();
    res.status(200).json(productsFinded);
});
const showByCategory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = _req.params;
    try {
        const products = yield product.getProductByCategory(name);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const retrieved_product = yield product.show(parseInt(id));
        res.status(200).json(retrieved_product);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category } = req.body;
    try {
        const created_product = yield product.create({
            name,
            category,
            price,
        });
        res.status(200).json(created_product);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield product.delete(parseInt(id));
        res.status(200).json({ success: ` ${id} product deleted` });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/category/:name', showByCategory);
    app.get('/products/:id', show);
    app.post('/products', verifyTokenMiddleware_1.authToken, create);
    app.delete('/products/:id', verifyTokenMiddleware_1.authToken, destroy);
};
exports.default = productRoutes;
