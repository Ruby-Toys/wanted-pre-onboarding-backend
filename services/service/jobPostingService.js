const {JobPosting} = require("../../models");
const {isFailUpdate, isFailDelete} = require("../queryUtils");
const {notfoundJobPostingException} = require("../../exceptions/jobPostingException");

exports.postJobPosting = async (jobPosting) => {
    return JobPosting.create(jobPosting);
}

exports.patchJobPosting = async (jobPosting) => {
    const updatedJobPosting = await JobPosting.update(
        {...jobPosting},
        {where : {id : jobPosting.id}}
    );

    if (isFailUpdate(updatedJobPosting)) throw notfoundJobPostingException.error();

    return updatedJobPosting;
}

exports.deleteJobPosting = async (jobPostingId) => {
    const result = await JobPosting.destroy({where: {id : jobPostingId}});

    if (isFailDelete(result)) throw notfoundJobPostingException.error();

    return result;
}