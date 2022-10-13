const {sequelize, JobPosting} = require("../../models");

exports.postJobPosting = async (jobPosting) => {
    return sequelize.transaction({}, async (transaction) => {
        return JobPosting.create(jobPosting, {transaction});
    });
}