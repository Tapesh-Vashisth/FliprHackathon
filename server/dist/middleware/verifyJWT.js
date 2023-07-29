"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const verifyJWT = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = req.cookies.JWT_HTTPONLY_Cookie;
    if (!token) {
        console.log("no token found!");
        return res
            .status(400)
            .json({ status: false });
    }
    jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, decoded) => {
        if (err) {
            console.log("err in jwt verify");
            return res
                .status(401)
                .send();
        }
        req.email = decoded.email;
        console.log("verified!!");
        next();
    });
};
exports.default = verifyJWT;
