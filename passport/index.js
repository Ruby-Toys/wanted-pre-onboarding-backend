const passport = require('passport');
const jobSeekerStrategy = require('./strategy/jobSeekerStrategy');
const {JobSeeker} = require("../models");
const {userType} = require('../models/enums');

module.exports = () => {
    passport.serializeUser((userInfo, done) => {
        // 세션에 사용자의 id와 구직자/채용자 구분 값을 저장
        done(null, userInfo);
    })

    passport.deserializeUser((userInfo, done) => {
        const {id, type} = userInfo;
        if (userType.isJobSeekerType(type)) {
            console.log("구직자 로그인 인증!");
            JobSeeker.findOne({where: {id}})
                .then(JobSeeker => done(null, JobSeeker))
                .catch(err => done(err));
        }
    })

    jobSeekerStrategy();
}