const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {JobSeeker} = require("../../models");
const {userType} = require('../../models/enums');

module.exports = () => {
    passport.use(
        userType.JOB_SEEKER,
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                const exJobSeeker = await JobSeeker.findOne({where: {email}});
                if (exJobSeeker) {
                    const result = await bcrypt.compare(password, exJobSeeker.password);
                    if (result) {
                        done(null, exJobSeeker);
                        return;
                    }
                }
                done(null, false, {message : '이메일 또는 비밀번호가 일치하지 않습니다.'});
            }
        )
    );
}