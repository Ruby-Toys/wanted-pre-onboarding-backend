const Sequelize = require('sequelize');
const {notEmptyValidator, dateValidator} = require("../validates/validator");

module.exports = (sequelize) => {
    return sequelize.define(
        'jobPosting',
        {
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('채용공고 명')
                }
            },
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('채용공고 공고내용')
                }
            },
            country: {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('근무 국가')
                }
            },
            region: {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('근무 지역')
                }
            },
            position: {
                type: Sequelize.STRING(20),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('포지션')
                }
            },
            requiredSkills: {
                type: Sequelize.STRING(100),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('요구 기술')
                }
            },
            deadlineAt: {
                type: Sequelize.DATEONLY,
                allowNull: true,
                validate: {
                    ...dateValidator('채용공고 종료일')
                }
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