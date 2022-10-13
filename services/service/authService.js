const {JobSeeker, Company} = require("../../models");
const bcrypt = require("bcrypt");

exports.signUpJobSeeker = async (jobSeeker) => {
    const hashPassword = await bcrypt.hash(jobSeeker.password, 12);
    return JobSeeker.create({
        ...jobSeeker,
        password : hashPassword
    });
}

exports.signUpCompany = async (company) => {
    const hashPassword = await bcrypt.hash(company.password, 12);
    return Company.create({
        ...company,
        password : hashPassword
    })
}