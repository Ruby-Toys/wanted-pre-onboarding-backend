const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'jobPosting',
        {
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            country: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            region: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            position: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            requiredSkills: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            deadlineAt: {
                type: Sequelize.DATEONLY,
                allowNull: true
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            tableName: 'JobPosting',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    )
};