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
const Itinarary_1 = __importDefault(require("../../models/Itinarary"));
const User_1 = __importDefault(require("../../models/User"));
const createItinarary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { iName, email } = req.body;
    let itinarary = new Itinarary_1.default({
        name: iName,
        places: []
    });
    try {
        yield itinerary.save();
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Internal error occurred!" });
    }
    return res
        .status(200)
        .json({ message: "Created itinerary successfully!" });
});
exports.default = createItinarary;
