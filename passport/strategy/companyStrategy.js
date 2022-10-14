const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {Company} = require("../../models");
const {userType} = require("../../models/enums");

module.exports = () => {
    passport.use(
        userType.COMPANY,
        new LocalStrategy(
            {
                usernameField: 'recruiterEmail',
                passwordField: 'password'
            },
            async (recruiterEmail, password, done) => {
                try {
                    const exCompany = await Company.findOne({where: {recruiterEmail}});
                    if (exCompany) {
                        const result = await bcrypt.compare(password, exCompany.password);
                        if (result) {
                            done(null, exCompany);
                            return;
                        }
                    }
                    done(null, false, {message : '이메일 또는 비밀번호가 일치하지 않습니다.'});
                } catch (err) {
                    console.error(err);
                    done(err);
                }
            }
        )
    );
}