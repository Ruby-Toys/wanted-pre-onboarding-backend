const {sequelize, Application} = require("../../models");
const {applicationState} = require("../../models/enums");

exports.postApplication = async (application) => {
    return sequelize.transaction({}, async (transaction) => {
        return Application.create(
            {...application, state : applicationState.SUPPORT},
            {transaction}
        );
    });
}