const {JobSeeker} = require("../../models");
const {existsEmailException} = require("../../exception/jobSeekerException");
const bcrypt = require("bcrypt");

exports.signUpOfJobSeeker = async (user) => {
    const existsJobSeeker = await JobSeeker.findOne({where : {email : user.email}});

    if (existsJobSeeker) existsEmailException.throw();

    const hashPassword = await bcrypt.hash(user.password, 12);
    return await JobSeeker.create({
        ...user,
        password : hashPassword
    })
}