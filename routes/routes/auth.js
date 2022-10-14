const express = require("express");
const {authController} = require("../../controllers");
const {isLoggedIn} = require("../../middlewares/loginStateMiddleware");

const router = express.Router();

router.post('/signUp/jobSeeker', authController.signUpJobSeeker);
router.post('/login/jobSeeker', authController.loginJobSeeker);
router.post('/signUp/company', authController.signUpCompany);
router.post('/login/company', authController.loginCompany);
router.get('/logout', isLoggedIn, authController.logout);

module.exports = router;