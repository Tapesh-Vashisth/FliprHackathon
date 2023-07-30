"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const placeSchema = new Schema({
    place_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: false
    },
    lon: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model('Place', placeSchema);
