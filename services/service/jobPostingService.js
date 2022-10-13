const {sequelize, Company, JobPosting} = require("../../models");
const {notFoundCompanyException} = require("../../exceptions/companyException");

exports.postJobPosting = async (jobPosting) => {
    return sequelize.transaction({}, async (transaction) => {
        const findCompany = await Company.findOne(
            {where: {id: jobPosting.companyId}},
            {transaction}
        );

        if (findCompany) return JobPosting.create(jobPosting, {transaction});

        throw notFoundCompanyException.error();
    });
}