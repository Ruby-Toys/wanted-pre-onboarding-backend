const request = require("supertest");
const app = require("../../app");
const {httpStatusCode} = require("../../routes/enums");
const {sequelize, Company} = require("../../models");
const bcrypt = require("bcrypt");
const {jobPostingService} = require("../../services");

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
                description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
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
                title: '원티드 사이트 개발 및 유지보수',
                description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
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
                title: '원티드 사이트 개발 및 유지보수',
                description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
                country: '대한민국',
                region: '서울',
                position: '개발,백엔드',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.OK, done);
    })
})


describe('PATCH /jobPostings/:id 로그인 하지 않은 상태', () => {

    let existsJobPosting;

    beforeAll( async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '원티드 사이트 개발 및 유지보수',
            description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        existsJobPosting = await jobPostingService.postJobPosting(jobPosting);
    })

    test('로그인 하지 않은 상태에서 채용공고 수정시 403 FORBIDDEN 응답', done => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));

        request(app)
            .patch(`/jobPostings/${existsJobPosting.id}`)
            .send({
                title: '원티드 사이트 개발 및 유지보수',
                description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
                country: '대한민국',
                region: '서울',
                position: '개발,백엔드',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})

describe('PATCH /jobPostings/:id', () => {

    let existsJobPosting;

    beforeAll( async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '원티드 사이트 개발',
            description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        existsJobPosting = await jobPostingService.postJobPosting(jobPosting);
    })

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
            .patch(`/jobPostings/${existsJobPosting.id}`)
            .send({
                title: '원티드 사이트 개발 및 유지보수',
                description: '원티드 개발자를 모집합니다.',
                country: '대한민국',
                region: '인천',
                position: '개발,백엔드,웹개발',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.BAD_REQUEST, done);
    })

    test('채용공고 수정 성공', done => {
        const now = new Date();
        const deadlineAt = new Date(now.setDate(now.getDate() + 20));

        agent
            .patch(`/jobPostings/${existsJobPosting.id}`)
            .send({
                title: '원티드 사이트 개발 및 유지보수',
                description: '원티드 개발자를 모집합니다.',
                country: '대한민국',
                region: '인천',
                position: '개발,백엔드,웹개발',
                requiredSkills: '자바, 스프링',
                deadlineAt,
            })
            .expect(httpStatusCode.OK, done);
    })
})


describe('DELETE /jobPostings/:id 로그인 하지 않은 상태', () => {

    let existsJobPosting;

    beforeAll( async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '원티드 사이트 개발 및 유지보수',
            description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        existsJobPosting = await jobPostingService.postJobPosting(jobPosting);
    })

    test('로그인 하지 않은 상태에서 채용공고 삭제시 403 FORBIDDEN 응답', done => {
        request(app)
            .delete(`/jobPostings/${existsJobPosting.id}`)
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})

describe('DELETE /jobPostings/:id', () => {

    let existsJobPosting;

    beforeAll( async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '원티드 사이트 개발',
            description: '원티드는 채용 공고 플랫폼 사업을 하고 있는 회사입니다',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        existsJobPosting = await jobPostingService.postJobPosting(jobPosting);
    })

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

    test('존재하지 않는 채용공고 삭제 요청시 404 NOT FOUND 응답', done => {
        agent
            .patch(`/jobPostings/${existsJobPosting.id + 99}`)
            .expect(httpStatusCode.NOT_FOUND, done);
    })

    test('채용공고 삭제 성공', done => {
        agent
            .delete(`/jobPostings/${existsJobPosting.id}`)
            .expect(httpStatusCode.OK, done);
    })
})
