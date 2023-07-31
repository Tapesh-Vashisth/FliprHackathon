import express from "express"
import { getPlace } from "../controllers/placesControllers/getPlace";
import addPlace from "../controllers/placesControllers/addPlace";
import getReviews from "../controllers/reviewsControllers/getReviews";
import addReview from "../controllers/reviewsControllers/addReview";
import verifyJWT from "../middleware/verifyJWT";
import editReview from "../controllers/reviewsControllers/editReview";

const router = express.Router()


router.get('/reviews/:id', getReviews)

router.get('/search', getPlace);

router.post('/add', addPlace)

router.use(verifyJWT);

router.post('/addreview', addReview);

router.post('/editreview', editReview);

export default router;