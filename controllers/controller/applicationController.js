const wrapAsync = require("../wrapAsync");
const {applicationService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

exports.postApplication = wrapAsync(async (req, res, next) => {
    const application = req.body;
    await applicationService.postApplication(application);
    return res.status(httpStatusCode.OK).json();
});