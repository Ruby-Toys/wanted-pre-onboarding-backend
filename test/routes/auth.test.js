const {sequelize, JobSeeker, Company} = require('../../models');
const app = require('../../app');
const request = require("supertest");
const {httpStatusCode} = require("../../routes/enums");
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
    const jobSeekerPassword = await bcrypt.hash(jobSeeker.password, 12);
    await JobSeeker.create({
        ...jobSeeker,
        password: jobSeekerPassword
    });

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
    await Company.create({
        ...company,
        password : companyPassword
    });
});

describe('POST /auth/signUp/jobSeeker', () => {

    test('구직자 이메일 중복 회원가입시 409 CONFLICT 응답', done => {
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

    test('구직자 이메일 값이 이메일 형식에 맞지 않을 경우 400 BAD REQUEST 응답', done => {
        request(app)
            .post('/auth/signUp/jobSeeker')
            .send({
                "email" : "test21232gmail.com",
                "password" : "1234",
                "name" : "김루비",
                "phoneNumber" : "01011112222",
                "careerPeriod" : 24
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    });

    test('구직자 경력 기간 값이 형식에 맞지 않을 경우 400 BAD REQUEST 응답', done => {
        request(app)
            .post('/auth/signUp/jobSeeker')
            .send({
                "email" : "test21232gmail.com",
                "password" : "1234",
                "name" : "김루비",
                "phoneNumber" : "01011112222",
                "careerPeriod" : -1
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    });

    test('구직자 회원가입 성공', done => {
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

    test('잘못된 정보로 구직자 로그인하면  401 Unauthorized 응답', (done) => {
        request(app)
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "test229@gmail.com",
                "password" : "1234asd",
            })
            .expect(httpStatusCode.UNAUTHORIZED, done);
    });

    test('구직자 로그인', (done) => {
        request(app)
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "test229@gmail.com",
                "password" : "1234",
            })
            .expect(httpStatusCode.OK, done);
    });
})

describe('POST /auth/signUp/company', () => {

    test('회사 담당자 이메일 중복 회원가입시 409 CONFLICT 응답', done => {
        request(app)
            .post('/auth/signUp/company')
            .send({
                "name" : "원티드",
                "description" : "채용사이트 원티드",
                "country" : "대한민국",
                "region" : "서울",
                "linkUrl" : "https://www.wanted.co.kr",
                "employees" : 200,
                "recruiterEmail" : "wanted@gamil.com",
                "recruiterName" : "우영우",
                "password" : "sadas",
            })
            .expect(httpStatusCode.CONFLICT, done);
    });

    test('회사 링크 주소 값이 url 형식에 맞지 않을 경우 400 BAD REQUEST 응답', done => {
        request(app)
            .post('/auth/signUp/company')
            .send({
                "name" : "당근마켓",
                "description" : "중고거래 플랫폼",
                "country" : "대한민국",
                "region" : "서울",
                "linkUrl" : "https:www.daangn.com/",
                "employees" : 150,
                "recruiterEmail" : "daangn@gamil.com",
                "recruiterName" : "김래빗",
                "password" : "asdwqdsadasd",
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    });

    test('회사 이메일 값이 이메일 형식에 맞지 않을 경우 400 BAD REQUEST 응답', done => {
        request(app)
            .post('/auth/signUp/company')
            .send({
                "name" : "당근마켓",
                "description" : "중고거래 플랫폼",
                "country" : "대한민국",
                "region" : "서울",
                "linkUrl" : "https://www.daangn.com/",
                "employees" : 150,
                "recruiterEmail" : "daangn@gamicom",
                "recruiterName" : "김래빗",
                "password" : "asdwqdsadasd",
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    })


    test('회사 회원가입 성공', done => {
        request(app)
            .post('/auth/signUp/company')
            .send({
                "name" : "당근마켓",
                "description" : "중고거래 플랫폼",
                "country" : "대한민국",
                "region" : "서울",
                "linkUrl" : "https://www.daangn.com/",
                "employees" : 150,
                "recruiterEmail" : "daangn@gamil.com",
                "recruiterName" : "김래빗",
                "password" : "asdwqdsadasd",
            })
            .expect(httpStatusCode.OK, done);
    })
})

describe('POST /auth/login/company', () => {
    test('잘못된 정보로 회사 로그인하면 401 Unauthorized 응답', (done) => {
        request(app)
            .post('/auth/login/company')
            .send({
                "recruiterEmail" : "wanted@gamil.com",
                "password" : "sadasasd",
            })
            .expect(httpStatusCode.UNAUTHORIZED, done);
    });

    test('회사 로그인', (done) => {
        request(app)
            .post('/auth/login/company')
            .send({
                "recruiterEmail" : "wanted@gamil.com",
                "password" : "sadas",
            })
            .expect(httpStatusCode.OK, done);
    });
})

describe('GET /auth/logout 로그아웃 실패 ', () => {
    test('로그인 되어 있지 않으면 403 FORBIDDEN 응답', done => {
        request(app)
            .get('/auth/logout')
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})


describe('GET /auth/logout 구직자 로그아웃', () => {
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

    test('구직자 로그아웃', done => {
        agent
            .get('/auth/logout')
            .expect(httpStatusCode.OK, done);
    })
})


describe('GET /auth/logout 회사 로그아웃', () => {

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

    test('회사 로그아웃', done => {
        agent
            .get('/auth/logout')
            .expect(httpStatusCode.OK, done);
    })
})