const wrapAsync = require("../wrapAsync");
const {authService} = require("../../services");
const passport = require("passport");
const {httpStatusCode} = require("../../routes/enums");
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
    passport.authenticate(userType.JOB_SEEKER, {}, (authError, jobSeeker, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!jobSeeker) {
                return res.status(httpStatusCode.UNAUTHORIZED).json({message: info.message});
            }

            // 여기에서 passport/index 에 작성한 부분으로 넘어감
            const userInfo = {
                id: jobSeeker.id,
                type: userType.JOB_SEEKER
            }

            return req.login(userInfo, loginError => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                return res.status(httpStatusCode.OK).json();
            });
        }
    ) (req, res, next);
};

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
    passport.authenticate(userType.COMPANY, {}, (authError, company, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!company) {
                return res.status(httpStatusCode.UNAUTHORIZED).json({message: info.message});
            }

            const userInfo = {
                id: company.id,
                type: userType.COMPANY
            }

            return req.login(userInfo, loginError => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                return res.status(httpStatusCode.OK).json();
            });
        }
    ) (req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(httpStatusCode.OK).json();
};