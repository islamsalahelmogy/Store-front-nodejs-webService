"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggingInMiddleware = (req, _res, next) => {
    console.log(`Method: ${req.method} & Path: ${req.path}`);
    next();
};
exports.default = loggingInMiddleware;
