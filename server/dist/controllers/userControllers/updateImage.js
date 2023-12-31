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
const updateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('update image');
    const { image } = req.body;
    let user;
    try {
        user = yield User_1.default.findById(req._id).exec();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: 'Internal error occurred!' });
    }
    user.image = image;
    try {
        yield user.save();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: 'Internal error occurred!' });
    }
    return res
        .status(200)
        .json({ message: "Image updated successfully!" });
});
exports.default = updateImage;
