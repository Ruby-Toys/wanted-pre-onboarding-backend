const {Resume, sequelize} = require("../../models");

exports.postResume = async (resume) => {
    return sequelize.transaction({}, async (transaction) => {
        return Resume.create(resume, {transaction});
    });
}