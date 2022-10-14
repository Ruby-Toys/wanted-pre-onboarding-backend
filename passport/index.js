const passport = require('passport');
const jobSeekerStrategy = require('./strategy/jobSeekerStrategy');
const companyStrategy = require('./strategy/companyStrategy');
const {JobSeeker, Company} = require("../models");
const {userType} = require('../models/enums');

module.exports = () => {
    passport.serializeUser((userInfo, done) => {
        // 세션에 사용자의 id와 구직자/채용자 구분 값을 저장
        done(null, userInfo);
    })

    passport.deserializeUser((userInfo, done) => {
        const {id, type} = userInfo;
        if (userType.JOB_SEEKER === type) {
            console.log("구직자 로그인 인증!");
            JobSeeker.findOne({where: {id}})
                .then(JobSeeker => done(null, JobSeeker))
                .catch(err => done(err));
        }
        else if (userType.COMPANY === type) {
            console.log("회사 로그인 인증!");
            Company.findOne({where: {id}})
                .then(Company => done(null, Company))
                .catch(err => done(err));
        }
    })

    jobSeekerStrategy();
    companyStrategy();
}