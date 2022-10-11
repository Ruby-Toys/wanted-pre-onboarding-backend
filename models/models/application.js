const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Application',
        {
            state: {
                type: Sequelize.STRING(20),
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