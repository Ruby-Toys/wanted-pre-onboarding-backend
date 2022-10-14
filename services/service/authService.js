const {JobSeeker, Company} = require("../../models");
const bcrypt = require("bcrypt");
const {existsEmailException} = require("../../exceptions/commonException");

exports.signUpJobSeeker = async (jobSeeker) => {
    const exists = await JobSeeker.findOne({where: {email : jobSeeker.email}});
    if (exists) throw existsEmailException();

    const hashPassword = await bcrypt.hash(jobSeeker.password, 12);
    return await JobSeeker.create({
        ...jobSeeker,
        password: hashPassword
    })
}

exports.signUpCompany = async (company) => {
    const exists = await Company.findOne({where: {recruiterEmail : company.recruiterEmail}});
    if (exists) throw existsEmailException();

    const hashPassword = await bcrypt.hash(company.password, 12);
    return Company.create({
        ...company,
        password : hashPassword
    })
}