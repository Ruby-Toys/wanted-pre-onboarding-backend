const wrapAsync = require("../wrapAsync");
const {jobPostingService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

exports.postJobPosting = wrapAsync(async (req, res, next) => {
    const jobPosting = req.body;
    jobPosting.companyId = req.user.id;

    await jobPostingService.postJobPosting(jobPosting);
    return res.status(httpStatusCode.OK).json();
});

exports.getJobPostings = wrapAsync(async (req, res, next) => {
    const searchForm = req.query;

    const jobPostings = await jobPostingService.getJobPostings(searchForm);
    return res.status(httpStatusCode.OK).json(jobPostings);
});

exports.getJobPosting = wrapAsync(async (req, res, next) => {
    const jobPostingId = req.params.id;

    const jobPosting = await jobPostingService.getJobPosting(jobPostingId);
    const relatedJobPostings = jobPosting.relatedJobPostings;
    return res.status(httpStatusCode.OK).json({jobPosting, relatedJobPostings});
});

exports.patchJobPosting = wrapAsync(async (req, res, next) => {
    const jobPosting = req.body;
    jobPosting.id = req.params.id;

    await jobPostingService.patchJobPosting(jobPosting);
    return res.status(httpStatusCode.OK).json();
});

exports.deleteJobPosting = wrapAsync(async (req, res, next) => {
    const jobPostingId = req.params.id;

    await jobPostingService.deleteJobPosting(jobPostingId);
    return res.status(httpStatusCode.OK).json();
});