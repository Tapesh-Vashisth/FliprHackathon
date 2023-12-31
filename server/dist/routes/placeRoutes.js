"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPlace_1 = require("../controllers/placesControllers/getPlace");
const getReviews_1 = __importDefault(require("../controllers/reviewsControllers/getReviews"));
const addReview_1 = __importDefault(require("../controllers/reviewsControllers/addReview"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const editReview_1 = __importDefault(require("../controllers/reviewsControllers/editReview"));
const router = express_1.default.Router();
router.get('/reviews/:id', getReviews_1.default);
router.get('/search', getPlace_1.getPlace);
router.use(verifyJWT_1.default);
router.post('/addreview', addReview_1.default);
router.post('/editreview', editReview_1.default);
exports.default = router;
