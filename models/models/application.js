const Sequelize = require('sequelize');
const {applicationState} = require('../enums');

module.exports = (sequelize) => {
    return sequelize.define(
        'application',
        {
            state: {
                type: Sequelize.ENUM(...Object.values(applicationState)),
                allowNull: false,
            }
        },
        {
            sequelize,
            underscored: false,
            tableName: 'Application',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
}