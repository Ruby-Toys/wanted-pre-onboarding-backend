const wrapAsync = require("../wrapAsync");
const {applicationService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

exports.postApplication = wrapAsync(async (req, res, next) => {
    const application = {
        resumeId: req.body.resumeId,
        jobPostingId: req.body.jobPostingId,
        jobSeekerId: req.user.id,
    }
    await applicationService.postApplication(application);
    return res.status(httpStatusCode.OK).json();
});