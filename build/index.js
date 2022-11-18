"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const loggingInMiddleware_1 = __importDefault(require("./middlewares/loggingInMiddleware"));
const userRoutes_1 = __importDefault(require("./handlers/userRoutes"));
const productRoutes_1 = __importDefault(require("./handlers/productRoutes"));
const orderRoutes_1 = __importDefault(require("./handlers/orderRoutes"));
const app = (0, express_1.default)();
/**
 * using two middlewares
 * cors
 * loggingInMiddleware
 */
app.use((0, cors_1.default)(), body_parser_1.default.json());
app.use(loggingInMiddleware_1.default);
(0, userRoutes_1.default)(app);
(0, orderRoutes_1.default)(app);
(0, productRoutes_1.default)(app);
app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});
exports.default = app;
