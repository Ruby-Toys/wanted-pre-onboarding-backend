const {Application} = require("../../models");
const {applicationState} = require("../../models/enums");

exports.postApplication = async (application) => {
    return Application.create({
        ...application,
        state : applicationState.SUPPORT
    });
}