const passport = require("passport");
const {httpStatusCode} = require("../routes/enums");

module.exports = (req, res, next, userType) => {
    passport.authenticate(userType, {}, (authError, user, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (!user) {
                return res.status(httpStatusCode.UNAUTHORIZED).json({message: info.message});
            }

            // 여기에서 passport/index 에 작성한 부분으로 넘어감
            const userInfo = {
                id: user.id,
                type: userType
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
}