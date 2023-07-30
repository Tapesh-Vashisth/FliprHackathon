export {}

import express from "express"
import addToItinarary from "../controllers/itineraryControllers/addToItinarary";
import createItinarary from "../controllers/itineraryControllers/createItinarary";
import verifyJWT from "../middleware/verifyJWT";
import getMyItinararies from "../controllers/itineraryControllers/getMyItinararies";
import deleteItinarary from "../controllers/itineraryControllers/deleteItinarary";
import getItinarary from "../controllers/itineraryControllers/getItinarary";
import editItemInItinarary from "../controllers/itineraryControllers/editItemInItinarary";

const router = express.Router()

router.get('/viewitinarary/:id', getItinarary)

router.use(verifyJWT)

router.get('/myitinararies', getMyItinararies)
router.put('/edit/:id', editItemInItinarary)
router.post('/create', createItinarary)
router.put('/add/:id', addToItinarary)
router.delete('/delete/:id', deleteItinarary)

export default router;