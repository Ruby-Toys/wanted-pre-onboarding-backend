const express = require("express");
const {isCompanyLoggedIn} = require('../../middlewares/loginStateMiddleware');
const {jobPostingController} = require("../../controllers");

const router = express.Router();

router.post('/', isCompanyLoggedIn, jobPostingController.postJobPosting);
// router.get('/', isCompanyLoggedIn, jobPostingController.postJobPosting);
router.get('/', jobPostingController.getJobPostings);
router.patch('/:id', isCompanyLoggedIn, jobPostingController.patchJobPosting);
router.delete('/:id', isCompanyLoggedIn, jobPostingController.deleteJobPosting);

module.exports = router;