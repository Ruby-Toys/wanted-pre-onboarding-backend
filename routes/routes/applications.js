const express = require("express");
const {isJobSeekerLoggedIn} = require('../../middlewares/loginStateMiddleware');
const {applicationController} = require("../../controllers");

const router = express.Router();

router.post('/', isJobSeekerLoggedIn, applicationController.postApplication);

module.exports = router;