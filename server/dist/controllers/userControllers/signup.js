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
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const crypto_1 = require("crypto");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup");
    const { name, email, password, otp } = req.body;
    const uuid = (0, crypto_1.randomUUID)();
    let existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!, user finding" });
    }
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "An account with this email already exists!" });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 5);
    let otpmodel;
    try {
        otpmodel = yield Otp_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!, otp not found in db" });
    }
    if (!otpmodel) {
        return res
            .status(404)
            .json({ message: "Otp not found for this user!" });
    }
    const otpDB = otpmodel.otp;
    if (otp !== otpDB) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" });
    }
    const user = new User_1.default({
        name,
        email,
        password: hashedPassword,
        verified: true,
    });
    try {
        yield user.save();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred, saving!" });
    }
    return res
        .status(201)
        .json({ message: "User signed up successfully!" });
});
exports.default = signup;
