const Sequelize = require('sequelize');
const {urlValidator, notEmptyValidator, unsignedNumberValidator, emailValidator} = require("../validates/validator");

module.exports = (sequelize) => {
    return sequelize.define(
        'company',
        {
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('회사명')
                }
            },
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('회사 소개')
                }
            },
            country: {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('회사 위치 국가')
                }
            },
            region: {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('회사 위치 지역')
                }
            },
            linkUrl: {
                type: Sequelize.STRING(200),
                validate: {
                    ...urlValidator('링크 주소')
                }
            },
            employees: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    ...unsignedNumberValidator('근무자 수')
                }
            },
            recruiterEmail: {
                type: Sequelize.STRING(100),
                allowNull : false,
                unique: true,
                validate: {
                    ...emailValidator('이메일')
                }
            },
            recruiterName: {
                type: Sequelize.STRING(20),
                allowNull : false,
                validate: {
                    ...notEmptyValidator('채용 담당자명')
                }
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull : false,
                validate: {
                    ...notEmptyValidator('비밀번호')
                }
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