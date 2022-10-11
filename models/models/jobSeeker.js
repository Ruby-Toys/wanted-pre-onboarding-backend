const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'JobSeeker',
        {
            email: {
                type: Sequelize.STRING(100),
                allowNull : false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull : false,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            phoneNumber : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            careerPeriod: {
                type: Sequelize.INTEGER.UNSIGNED,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            tableName: 'JobSeeker',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
}