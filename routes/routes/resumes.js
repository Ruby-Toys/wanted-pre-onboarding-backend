const express = require("express");
const {isJobSeekerLoggedIn} = require('../../middlewares/loginStateMiddleware');
const {resumeController} = require("../../controllers");

const router = express.Router();

router.post('/', isJobSeekerLoggedIn, resumeController.postResume);

module.exports = router;