const {sequelize} = require('../../models');
const app = require('../../app');
const request = require("supertest");
const {httpStatusCode} = require("../../routes/enums");
const {Sequelize} = require("sequelize");

beforeAll(async () => {
    await sequelize.sync({force : true});
    await request(app)
        .post('/auth/signUp/jobSeeker')
        .send({
            "email" : "test229@gmail.com",
            "password" : "1234",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 24
        })
        .expect(httpStatusCode.OK);
});

describe('POST /auth/signUp/jobSeeker', () => {

    test('구직자 이메일 중복 회원가입시 에러 발생', done => {
        request(app)
            .post('/auth/signUp/jobSeeker')
            .send({
                "email" : "test229@gmail.com",
                "password" : "1234123",
                "name" : "이용석",
                "phoneNumber" : "01011112222",
                "careerPeriod" : 24
            })
            .expect(httpStatusCode.CONFLICT, done);
    });


    test('구직자 회원가입', done => {
        request(app)
            .post('/auth/signUp/jobSeeker')
            .send({
                "email" : "test212329@gmail.com",
                "password" : "1234",
                "name" : "김루비",
                "phoneNumber" : "01011112222",
                "careerPeriod" : 24
            })
            .expect(httpStatusCode.OK, done);
    });
})




describe('POST /auth/login/jobSeeker', () => {

    test('구직자 로그인', (done) => {
        request(app)
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "test229@gmail.com",
                "password" : "1234",
            })
            .expect(httpStatusCode.OK, done);

        Sequelize
    });
})

describe('POST /auth/signUp/company', () => {

})

describe('POST /auth/login/company', () => {

})

describe('GET /auth/logout', () => {

})