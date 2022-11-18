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
const orders_1 = require("../models/orders");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const order = new orders_1.OrderStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderes = yield order.getAll();
    res.status(200).json(orderes);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const retrieved_order = yield order.show(id);
        res.status(200).json(retrieved_order);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const showUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user_orders = yield order.getUserOrders(id);
        res.status(200).json(user_orders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, status } = req.body;
    try {
        const created_order = yield order.create(user_id, status);
        res.status(200).json(created_order);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = parseInt(req.params.id);
    const { product_id, quantity } = req.body;
    try {
        const added_product = yield order.addProduct(order_id, product_id, quantity);
        res.status(200).json(added_product);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield order.delete(id);
        res.status(200).json({ success: `${id} order deleted` });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const orderRoutes = (app) => {
    app.get('/orders', verifyTokenMiddleware_1.authToken, index);
    app.get('/orders/:id', verifyTokenMiddleware_1.authToken, show);
    app.get('/orders/user/:id', verifyTokenMiddleware_1.authToken, showUserOrders);
    app.post('/orders', verifyTokenMiddleware_1.authToken, create);
    app.post('/orders/:id/product', verifyTokenMiddleware_1.authToken, addProduct);
    app.delete('/orders/:id', verifyTokenMiddleware_1.authToken, destroy);
};
exports.default = orderRoutes;
