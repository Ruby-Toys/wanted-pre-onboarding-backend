const wrapAsync = require("../wrapAsync");
const {authService} = require("../../services");
const passport = require("passport");
const {httpStatusCode} = require("../../routes/enums");
const {userType} = require("../../models/enums");

exports.signUpOfJobSeeker = wrapAsync(async (req, res) => {
    const jobSeeker = req.body;
    const signedJobSeeker = await authService.signUpOfJobSeeker(jobSeeker);
    const jobSeekerInfo = {
        name : signedJobSeeker.name,
        email : signedJobSeeker.email
    };
    return res.status(httpStatusCode.OK).json(jobSeekerInfo);
})

exports.loginOfJobSeeker = (req, res, next) => {
    passport.authenticate(userType.JOB_SEEKER, {}, (authError, jobSeeker, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!jobSeeker) {
                return res.send(info.message);
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
                return res.redirect('/');
            });
        }
    ) (req, res, next);
}