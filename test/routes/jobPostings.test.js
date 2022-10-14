const request = require("supertest");
const app = require("../../app");
const {httpStatusCode} = require("../../routes/enums");
const {sequelize, Company} = require("../../models");
const bcrypt = require("bcrypt");

beforeAll(async () => {
    await sequelize.sync({force : true});
    const company = {
        "name" : "원티드",
        "description" : "채용사이트 원티드",
        "country" : "대한민국",
        "region" : "서울",
        "linkUrl" : "https://www.wanted.co.kr",
        "employees" : 200,
        "recruiterEmail" : "wanted@gamil.com",
        "recruiterName" : "백승수",
        "password" : "sadas",
    }
    const companyPassword = await bcrypt.hash(company.password, 12);
    await Company.create({...company, password : companyPassword});
});


describe('POST /jobPostings 로그인 하지 않은 상태', () => {

    test('로그인 하지 않은 상태에서 채용공고 등록시 403 FORBIDDEN 응답', done => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));

        request(app)
            .post('/jobPostings')
            .send({
                title: '엔드포인트 보안에이전트 개발',
                description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
                country: '대한민국',
                region: '서울',
                position: '개발,백엔드',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})

describe('POST /jobPostings', () => {

    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/auth/login/company')
            .send({
                "recruiterEmail" : "wanted@gamil.com",
                "password" : "sadas",
            })
            .end(done);
    })

    test('채용공고 종료일이 오늘 이전일 경우 400 BAD REQUEST 응답', done => {
        const now = new Date();
        const deadlineAt = new Date(now.setDate(now.getDate() -1));

        agent
            .post('/jobPostings')
            .send({
                title: '엔드포인트 보안에이전트 개발',
                description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
                country: '대한민국',
                region: '서울',
                position: '개발,백엔드',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    })

    test('채용공고 등록 성공', done => {
        const now = new Date();
        const deadlineAt = new Date(now.setDate(now.getDate() + 20));

        agent
            .post('/jobPostings')
            .send({
                title: '엔드포인트 보안에이전트 개발',
                description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
                country: '대한민국',
                region: '서울',
                position: '개발,백엔드',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.OK, done);
    })
})