const wrapAsync = require("../wrapAsync");
const wrapAuthenticate = require("../wrapAuthenticate");
const {authService} = require("../../services");
const httpStatusCode = require("../../routes/enums/httpStatusCode");
const {userType} = require("../../models/enums");

exports.signUpJobSeeker = wrapAsync(async (req, res, next) => {
    const jobSeeker = req.body;
    const signedJobSeeker = await authService.signUpJobSeeker(jobSeeker);
    const jobSeekerInfo = {
        name : signedJobSeeker.name,
        email : signedJobSeeker.email
    };
    return res.status(httpStatusCode.OK).json(jobSeekerInfo);
});

exports.loginJobSeeker = (req, res, next) => {
    wrapAuthenticate(req, res, next, userType.JOB_SEEKER);
}

exports.signUpCompany = wrapAsync(async (req, res, next) => {
    const company = req.body;
    const signedCompany = await authService.signUpCompany(company);
    const companyInfo = {
        name : signedCompany.name,
        recruiterName : signedCompany.recruiterName,
        recruiterEmail : signedCompany.recruiterEmail,
    };
    return res.status(httpStatusCode.OK).json(companyInfo);
});

exports.loginCompany = (req, res, next) => {
    wrapAuthenticate(req, res, next, userType.COMPANY);
}

exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);

        req.session.destroy();
        res.status(httpStatusCode.OK).json("로그아웃 되었습니다.");
    });
};