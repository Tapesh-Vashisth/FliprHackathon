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
const Place_1 = __importDefault(require("../../models/Place"));
const axios_1 = __importDefault(require("axios"));
const addPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery } = req.body;
    let geocoding_api_url = `https://api.geoapify.com/v1/geocode/search?text=${searchQuery}&limit=10&format=json&apiKey=${process.env.MAP_API_KEY}`;
    let data = yield axios_1.default.get(geocoding_api_url);
    console.log(data.data);
    data = data.data.results;
    let return_data = [];
    for (let i = 0; i < data.length; i++) {
        let { lon, lat, city, place_id } = data[i];
        console.log(data[i]);
        return_data.push({
            place_id,
            lon,
            lat,
            city
        });
        let new_place = new Place_1.default({
            place_id,
            lon,
            lat,
            city
        });
        try {
            yield new_place.save();
        }
        catch (err) {
            return res
                .status(500)
                .json({ message: "Internal error occurred, or place already exists" });
        }
    }
    return res
        .status(200)
        .json(return_data);
});
exports.default = addPlace;
