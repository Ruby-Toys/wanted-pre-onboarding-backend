const wrapAsync = require("../wrapAsync");
const {authService} = require("../../services");

exports.signUpOfJobSeeker = wrapAsync(async (req, res) => {
    const jobSeeker = req.body;
    const signedJobSeeker = await authService.signUpOfJobSeeker(jobSeeker);
    const jobSeekerInfo = {
        name : signedJobSeeker.name,
        email : signedJobSeeker.email
    };
    return res.status(200).json(jobSeekerInfo);
})

exports.loginOfJobSeeker = wrapAsync(async (req, res, next) => {

})