const {sequelize, Application} = require("../../models");

exports.postApplication = async (application) => {
    return sequelize.transaction({}, async (transaction) => {
        return Application.create(application, {transaction});
    });
}