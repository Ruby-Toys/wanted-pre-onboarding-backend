const {userType} = require("../models/enums");
const httpStatusCode = require("../routes/enums/httpStatusCode");
const isJobSeekerType = (req) => {
    return req.isAuthenticated() && req.user.type === userType.JOB_SEEKER;
}
const isCompanyType = (req) => {
    return req.isAuthenticated() && req.user.type === userType.COMPANY;
}

const REQUEST_LOGIN_MESSAGE = "로그인이 필요합니다.";

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(httpStatusCode.FORBIDDEN).json({message : REQUEST_LOGIN_MESSAGE});
    }
}

exports.isJobSeekerLoggedIn = (req, res, next) => {
    if (isJobSeekerType(req)) {
        next();
    } else {
        res.status(httpStatusCode.FORBIDDEN).json({message : REQUEST_LOGIN_MESSAGE});
    }
}

exports.isCompanyLoggedIn = (req, res, next) => {
    if (isCompanyType(req)) {
        next();
    } else {
        res.status(httpStatusCode.FORBIDDEN).json({message : REQUEST_LOGIN_MESSAGE});
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(httpStatusCode.FORBIDDEN).json({message : REQUEST_LOGIN_MESSAGE});
    }
}