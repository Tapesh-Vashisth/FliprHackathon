import express from "express"
import { getPlace } from "../controllers/placesControllers/getPlace";
import addPlace from "../controllers/placesControllers/addPlace";
import getReviews from "../controllers/reviewsControllers/getReviews";
import addReview from "../controllers/reviewsControllers/addReview";

const router = express.Router()

router.get('/reviews/:id', getReviews)

router.post('/addreview', addReview)

router.get('/search', getPlace);

router.post('/add', addPlace)

export default router;