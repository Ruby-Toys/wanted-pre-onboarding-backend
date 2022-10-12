const express = require("express");
const {isJobSeekerType} = require('../../models/enums');
const {resumeController} = require("../../controllers");

const router = express.Router();

router.post('/', isJobSeekerType, resumeController.postResume);

module.exports = router;