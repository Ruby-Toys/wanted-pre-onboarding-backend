const {Resume} = require("../../models");

exports.postResume = (resume) => {
    return Resume.create(resume);
}