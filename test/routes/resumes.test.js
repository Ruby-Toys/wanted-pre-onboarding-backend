const request = require("supertest");
const app = require("../../app");
const {httpStatusCode} = require("../../routes/enums");
const {sequelize, JobSeeker} = require("../../models");
const bcrypt = require("bcrypt");

beforeAll(async () => {
    await sequelize.sync({force : true});
    const jobSeeker = {
        "email" : "test229@gmail.com",
        "password" : "1234",
        "name" : "김루비",
        "phoneNumber" : "01011112222",
        "careerPeriod" : 24
    }
    const password = await bcrypt.hash(jobSeeker.password, 12);
    await JobSeeker.create({...jobSeeker, password})
});


describe('POST /resumes 로그인 하지 않은 상태', () => {

    test('로그인 하지 않은 상태에서 이력서 등록시 403 FORBIDDEN 응답', done => {
        request(app)
            .post('/resumes')
            .send({
                description: '지원자 김루비입니다!',
                career: '엠브이소프텍 1년 7개월 근무',
                skills: '자바, 스프링',
                linkUrl: 'https://github.com/MisterRuby',
            })
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})

describe('POST /resumes', () => {

    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "test229@gmail.com",
                "password" : "1234",
            })
            .end(done);
    })

    test('링크 주소 값이 url 형식에 맞지 않을 경우 400 BAD REQUEST 응답', done => {
        agent
            .post('/resumes')
            .send({
                description: '지원자 김루비입니다!',
                career: '엠브이소프텍 1년 7개월 근무',
                skills: '자바, 스프링',
                linkUrl: 'https:MisterRuby',
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    })

    test('이력서 등록 성공', done => {
        agent
            .post('/resumes')
            .send({
                description: '지원자 김루비입니다!',
                career: '엠브이소프텍 1년 7개월 근무',
                skills: '자바, 스프링',
                linkUrl: 'https://github.com/MisterRuby',
            })
            .expect(httpStatusCode.OK, done);
    })
})