const {JobSeeker} = require("../../models");
const {existsEmailException} = require("../../exception/jobSeekerException");
const bcrypt = require("bcrypt");

const signUp = async (user) => {
    const email = user.email;

    const existsJobSeeker = await JobSeeker.findOne({where : {email}});
    if (existsJobSeeker) {
        existsEmailException();
    }

    const hashPassword = await bcrypt.hash(user.password, 12);
    return await JobSeeker.create({
        ...user,
        password : hashPassword
    })
}

module.exports = {
    signUp
}