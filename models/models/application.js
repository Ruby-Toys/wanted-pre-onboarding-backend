const Sequelize = require('sequelize');
const {applicationState} = require('../enums');
const {enumValidator} = require("../validates/validator");

module.exports = (sequelize) => {
    return sequelize.define(
        'application',
        {
            state: {
                type: Sequelize.ENUM(...Object.values(applicationState)),
                allowNull: false,
                validate: {
                    ...enumValidator('지원 이력 상태', Object.values(applicationState))
                }
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