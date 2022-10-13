const {Resume} = require("../../models");

exports.postResume = async (resume) => {
    return Resume.create(resume);
}