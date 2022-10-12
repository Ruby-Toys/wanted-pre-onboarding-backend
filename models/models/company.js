const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'company',
        {
            name: {
                type: Sequelize.STRING(50),
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
            linkUrl: {
                type: Sequelize.STRING(200),
            },
            employees: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            recruiterEmail: {
                type: Sequelize.STRING(100),
                allowNull : false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull : false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            tableName: 'Company',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
}