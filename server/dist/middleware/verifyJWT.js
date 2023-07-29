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
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY), (err, user) => {
        if (err) {
            res
                .status(400)
                .json({ status: false, token: "Cannot verify token!" });
        }
        req._id = user._id;
        next();
    });
};
exports.default = verifyJWT;
