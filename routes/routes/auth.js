const express = require("express");
const passport = require("passport");
const {authController} = require("../../controllers");
const {isJobSeekerLoggedIn} = require("../../middlewares/loginStateMiddleware");

const router = express.Router();

router.post('/signUp/jobSeeker', authController.signUpJobSeeker);


router.post('/login/jobSeeker', isJobSeekerLoggedIn, authController.loginJobSeeker)

module.exports = router;