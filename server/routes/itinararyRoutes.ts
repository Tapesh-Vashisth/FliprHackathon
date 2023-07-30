export {}

import express from "express"
import addToItinarary from "../controllers/itineraryControllers/addToItinarary";
import createItinarary from "../controllers/itineraryControllers/createItinarary";
import verifyJWT from "../middleware/verifyJWT";
import getMyItinararies from "../controllers/itineraryControllers/getMyItinararies";
import deleteItinarary from "../controllers/itineraryControllers/deleteItinarary";

const router = express.Router()

router.use(verifyJWT)

router.get('/myitinararies', getMyItinararies)
router.post('/create', createItinarary)
router.put('/add', addToItinarary)
router.delete('/delete', deleteItinarary)

export default router;