export {}

import express from "express"
import signup from "../controllers/userControllers/signup"
import login from "../controllers/userControllers/login"
import sendResetPasswordOtp from "../controllers/userControllers/sendResetPasswordOtp"
import sendVerifyEmailOtp from "../controllers/userControllers/sendVerifyEmailOtp"
import resetPassword from "../controllers/userControllers/resetPassword"
import verifyJWT from "../middleware/verifyJWT"
import logout from "../controllers/userControllers/logout"
import updateImage from "../controllers/userControllers/updateImage"
import editAccountDetails from "../controllers/userControllers/editAccountDetails"
import deleteAccount from "../controllers/userControllers/deleteAccount"
import check from "../controllers/userControllers/check"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/passwordotp', sendResetPasswordOtp)
router.post('/sendotp', sendVerifyEmailOtp)
router.post('/resetpassword', resetPassword)

router.use(verifyJWT)

router.get('/check', check)
router.get('/logout', logout);
router.post('/updateimage', updateImage)
router.put('/editaccount', editAccountDetails)
router.post('/deleteUser', deleteAccount)

export default router;