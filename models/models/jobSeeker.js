const Sequelize = require('sequelize');
const {emailValidator, notEmptyValidator, unsignedNumberValidator} = require("../validates/validator");

module.exports = (sequelize) => {
    return sequelize.define(
        'jobSeeker',
        {
            email: {
                type: Sequelize.STRING(100),
                allowNull : false,
                unique: true,
                validate: {
                    ...emailValidator('이메일')
                }
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull : false,
                validate: {
                    ...notEmptyValidator('비밀번호')
                }
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull : false,
                validate: {
                    ...notEmptyValidator('이름')
                }
            },
            phoneNumber : {
                type: Sequelize.STRING(20),
                allowNull : false,
                validate: {
                    ...notEmptyValidator('전화번호')
                }
            },
            careerPeriod: {
                type: Sequelize.INTEGER.UNSIGNED,
                validate: {
                    ...unsignedNumberValidator('경력 기간')
                }
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