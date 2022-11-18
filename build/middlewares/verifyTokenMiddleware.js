"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const authToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization.split(' ')[1];
            jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        }
        else
            throw new Error(`Authorization token needed`);
        next();
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
};
exports.authToken = authToken;
