const wrapAsync = require("../wrapAsync");
const {jobPostingService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

exports.postJobPosting = wrapAsync(async (req, res, next) => {
    const jobPosting = req.body;
    jobPosting.companyId = req.user.id;

    await jobPostingService.postJobPosting(jobPosting);
    return res.status(httpStatusCode.OK);
});