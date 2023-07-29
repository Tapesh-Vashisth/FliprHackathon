"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const reviewSchema = new Schema({
    placeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Place",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
}, { timestamps: true,
    versionKey: false });
exports.default = mongoose_1.default.model('Review', reviewSchema);
