const express = require("express");
const passport = require("passport");
const {authController} = require("../../controllers");
const {loginStateMiddleware} = require("../../middlewares");

const router = express.Router();

router.post('/signUp/jobSeeker', authController.signUpOfJobSeeker);


router.post('/login/jobSeeker', loginStateMiddleware.isJobSeekerLoggedIn, authController.loginOfJobSeeker)

module.exports = router;