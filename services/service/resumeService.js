const {Resume, JobSeeker} = require("../../models");
const {notFoundJobSeekerException} = require("../../exceptions/jobSeekerException");

exports.postResume = async (resume) => {
    const findJobSeeker = await JobSeeker.findOne({where: {id: resume.jobSeekerId}});

    if (findJobSeeker) return Resume.create(resume);

    throw notFoundJobSeekerException.error();
}