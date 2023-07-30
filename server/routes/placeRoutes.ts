import express from "express"
import { getPlace } from "../controllers/placesControllers/getPlace";
import addPlace from "../controllers/placesControllers/addPlace";

const router = express.Router()

router.get('/search', getPlace);

router.post('/add', addPlace)

export default router;