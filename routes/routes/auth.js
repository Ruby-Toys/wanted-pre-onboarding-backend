const express = require("express");
const {signUpOfJobSeeker} = require("../../controllers");

const router = express.Router();

router.post('/signUp/jobSeeker', signUpOfJobSeeker);

module.exports = router;