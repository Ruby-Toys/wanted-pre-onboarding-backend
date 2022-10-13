const express = require("express");
const {isCompanyLoggedIn} = require('../../middlewares/loginStateMiddleware');
const {jobPostingController} = require("../../controllers");

const router = express.Router();

router.post('/', isCompanyLoggedIn, jobPostingController.postJobPosting);

module.exports = router;