const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'resume',
        {
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            career: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            skills: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            linkUrl: {
                type: Sequelize.STRING(200),
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            tableName: 'Resume',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
}