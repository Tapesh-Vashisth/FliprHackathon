"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const verifyJWT = (req, res, next) => {
    console.log("verifyJwt");
    // accessing the token from the headers
    let token = req.cookies.JWT_HTTPONLY_Cookie;
    console.log(token);
    // jwt verify function, validates the user's token
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY), (err, decoded) => {
        if (err)
            return res.status(401).send(); //invalid token
        req.uuid = decoded.uuid;
        next();
    });
};
exports.default = verifyJWT;
