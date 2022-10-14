const Sequelize = require('sequelize');
const {notEmptyValidator, urlValidator} = require('../validates/validator');

module.exports = (sequelize) => {
    return sequelize.define(
        'resume',
        {
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('자기소개')
                }
            },
            career: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('경력')
                }
            },
            skills: {
                type: Sequelize.STRING(500),
                allowNull: false,
                validate: {
                    ...notEmptyValidator('보유 기술')
                }
            },
            linkUrl: {
                type: Sequelize.STRING(200),
                validate: {
                    ...urlValidator('링크 주소')
                }
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