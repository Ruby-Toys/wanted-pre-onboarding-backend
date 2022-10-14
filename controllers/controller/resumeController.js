const wrapAsync = require("../wrapAsync");
const {resumeService} = require("../../services");
const httpStatusCode = require("../../routes/enums/httpStatusCode");

exports.postResume = wrapAsync(async (req, res, next) => {
    const resume = req.body;
    resume.jobSeekerId = req.user.id;

    await resumeService.postResume(resume);
    return res.status(httpStatusCode.OK).json();
});