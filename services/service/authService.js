const {JobSeeker, Company, sequelize} = require("../../models");
const {existsEmailException} = require("../../exceptions/commonException");
const bcrypt = require("bcrypt");

exports.signUpJobSeeker = async (jobSeeker) => {
    return sequelize.transaction({}, async (transaction) => {
        const hashPassword = await bcrypt.hash(jobSeeker.password, 12);
        return JobSeeker.create({
            ...jobSeeker,
            password : hashPassword
        }, {transaction})
    });
}

exports.signUpCompany = async (company) => {
    return sequelize.transaction({}, async (transaction) => {
        const hashPassword = await bcrypt.hash(company.password, 12);
        return Company.create({
            ...company,
            password : hashPassword
        }, {transaction})
    })
}