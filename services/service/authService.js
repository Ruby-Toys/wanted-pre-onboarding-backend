const {JobSeeker} = require("../../models");
const {existsEmailException} = require("../../exception/jobSeekerException");
const bcrypt = require("bcrypt");

exports.signUpOfJobSeeker = async (jobSeeker) => {
    const existsJobSeeker = await JobSeeker.findOne({where : {email : jobSeeker.email}});

    if (existsJobSeeker) throw existsEmailException.error();

    const hashPassword = await bcrypt.hash(jobSeeker.password, 12);
    return await JobSeeker.create({
        ...jobSeeker,
        password : hashPassword
    })
}