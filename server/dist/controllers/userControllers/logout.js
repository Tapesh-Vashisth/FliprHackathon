"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const logout = (req, res, next) => {
    res.clearCookie('JWT_HTTPONLY_Cookie');
    req._id = null;
    return res
        .status(200)
        .json({ message: "Logged out!!" });
};
exports.default = logout;
