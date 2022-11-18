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
const users_1 = require("../models/users");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
const store = new users_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.getAll();
    res.status(200).json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const retrieved_users = yield store.show(parseInt(id));
        res.status(200).json(retrieved_users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, password } = req.body;
    try {
        const user = yield store.create({ first_name, last_name, password });
        const token = jsonwebtoken_1.default.sign({ id: user }, secret);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield store.delete(parseInt(id));
        res.status(200).json({ success: ` ${id} user deleted` });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const userRoutes = (app) => {
    app.get('/users', verifyTokenMiddleware_1.authToken, index);
    app.get('/users/:id', verifyTokenMiddleware_1.authToken, show);
    app.post('/users', verifyTokenMiddleware_1.authToken, create);
    app.post('/users/signup', create);
    app.delete('/users/:id', verifyTokenMiddleware_1.authToken, destroy);
};
exports.default = userRoutes;
