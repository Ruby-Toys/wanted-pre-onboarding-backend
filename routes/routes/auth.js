const express = require("express");
const {authService} = require('../../services');
const wrapAsync = require('../wrapAsync');

const router = express.Router();

router.post(
    '/signUp/jobSeeker',
    wrapAsync(async (req, res, next) => {
        const jobSeeker = req.body;
        const signedJobSeeker = await authService.signUp(jobSeeker);
        return res.json(signedJobSeeker);
    })
);

module.exports = router;