const {Resume, JobSeeker, sequelize} = require("../../models");
const {notFoundJobSeekerException} = require("../../exceptions/jobSeekerException");

exports.postResume = async (resume) => {
    return sequelize.transaction({}, async (transaction) => {
        const findJobSeeker = await JobSeeker.findOne(
            {where: {id: resume.jobSeekerId}},
            {transaction}
        );

        if (findJobSeeker) return Resume.create(resume, {transaction});

        throw notFoundJobSeekerException.error();
    });
}