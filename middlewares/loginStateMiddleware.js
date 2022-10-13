const {userType} = require("../models/enums");
const isJobSeekerType = (req) => {
    return req.isAuthenticated() && req.user.type === userType.JOB_SEEKER;
}
const isCompanyType = (req) => {
    return req.isAuthenticated() && req.user.type === userType.COMPANY;
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
}

exports.isJobSeekerLoggedIn = (req, res, next) => {
    if (isJobSeekerType(req)) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
}

exports.isCompanyLoggedIn = (req, res, next) => {
    if (isCompanyType(req)) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}