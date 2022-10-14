const {Application, sequelize, Resume} = require("../../models");
const {applicationState} = require("../../models/enums");
const {existsApplicationException} = require("../../exceptions/ApplicationException");

exports.postApplication = async (application) => {
    return sequelize.transaction({}, async (transaction) => {
        const exists = await Application.findOne({
            include: [
                {
                    model: Resume,
                    where : {jobSeekerId : application.jobSeekerId}
                }
            ],
            where: {jobPostingId : application.jobPostingId}
        }, {transaction});

        if (exists) throw existsApplicationException();

        return Application.create({
            resumeId : application.resumeId,
            jobPostingId : application.jobPostingId,
            state : applicationState.SUPPORT
        }, {transaction});
    })
}