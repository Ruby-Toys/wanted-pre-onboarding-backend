const request = require("supertest");
const app = require("../../app");
const httpStatusCode = require("../../routes/enums/httpStatusCode");
const {sequelize, Company, JobSeeker, Resume, JobPosting, Application} = require("../../models");
const bcrypt = require("bcrypt");
const {applicationState} = require("../../models/enums");

describe('POST /applications 로그인 하지 않은 상태', () => {

    let existsJobSeeker;
    let existsResume;
    let existsJobPosting;
    let existsApplication;
    let jobSeeker;
    let resume;

    beforeAll(async () => {

        await sequelize.sync({force : true});
        const jobSeekerInfo = {
            "email" : "rubykim@gmail.com",
            "password" : "sadas",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }
        const jobSeekerPassword = await bcrypt.hash(jobSeekerInfo.password, 12);
        existsJobSeeker = await JobSeeker.create({...jobSeekerInfo, password: jobSeekerPassword});
        const resumeInfo = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: existsJobSeeker.id
        };
        existsResume = await Resume.create(resumeInfo);
        const companyInfo = {
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
        const companyPassword = await bcrypt.hash(companyInfo.password, 12);
        const company = await Company.create({...companyInfo, password: companyPassword});
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPostingInfo = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }
        existsJobPosting = await JobPosting.create(jobPostingInfo);

        const applicationInfo = {
            resumeId : existsResume.id,
            jobPostingId : existsJobPosting.id,
            state : applicationState.SUPPORT
        }

        existsApplication = await Application.create(applicationInfo);

        const newJobSeekerInfo = {
            "email" : "rubykim22@gmail.com",
            "password" : "sadas",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }
        jobSeeker = await JobSeeker.create(newJobSeekerInfo);
        const newResumeInfo = {
            description: '지원자 김루비입니다!',
            career: '신입',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        };
        resume = await Resume.create(newResumeInfo);
    });

    test('로그인 하지 않은 상태에서 지원 이력 등록시 403 FORBIDDEN 응답', done => {
        request(app)
            .post('/applications')
            .send({
                resumeId : resume.id,
                jobPostingId : existsJobPosting.id,
                jobSeekerId : jobSeeker.id
            })
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})


describe('POST /applications 중복 지원 이력 등록', () => {
    let existsJobSeeker;
    let existsResume;
    let existsJobPosting;
    let existsApplication;

    beforeAll(async () => {

        await sequelize.sync({force : true});
        const jobSeekerInfo = {
            "email" : "rubykim@gmail.com",
            "password" : "sadas",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }
        const jobSeekerPassword = await bcrypt.hash(jobSeekerInfo.password, 12);
        existsJobSeeker = await JobSeeker.create({...jobSeekerInfo, password: jobSeekerPassword});
        const resumeInfo = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: existsJobSeeker.id
        };
        existsResume = await Resume.create(resumeInfo);
        const companyInfo = {
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
        const companyPassword = await bcrypt.hash(companyInfo.password, 12);
        const company = await Company.create({...companyInfo, password: companyPassword});
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPostingInfo = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }
        existsJobPosting = await JobPosting.create(jobPostingInfo);

        const applicationInfo = {
            resumeId : existsResume.id,
            jobPostingId : existsJobPosting.id,
            state : applicationState.SUPPORT
        }

        existsApplication = await Application.create(applicationInfo);
    });

    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "rubykim@gmail.com",
                "password" : "sadas",
            })
            .end(done);
    })

    test('같은 채용 공고에 중복 지원 이력 등록시 403 FORBIDDEN 응답', done => {
        agent
            .post('/applications')
            .send({
                resumeId : existsResume.id,
                jobPostingId : existsJobPosting.id,
            })
            .expect(httpStatusCode.FORBIDDEN, done);
    })
})



describe('POST /applications', () => {
    let existsJobSeeker;
    let existsResume;
    let existsJobPosting;
    let existsApplication;
    let jobSeeker;
    let resume;

    beforeAll(async () => {

        await sequelize.sync({force : true});
        const jobSeekerInfo = {
            "email" : "rubykim@gmail.com",
            "password" : "sadas",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }
        const jobSeekerPassword = await bcrypt.hash(jobSeekerInfo.password, 12);
        existsJobSeeker = await JobSeeker.create({...jobSeekerInfo, password: jobSeekerPassword});
        const resumeInfo = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: existsJobSeeker.id
        };
        existsResume = await Resume.create(resumeInfo);
        const companyInfo = {
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
        const companyPassword = await bcrypt.hash(companyInfo.password, 12);
        const company = await Company.create({...companyInfo, password: companyPassword});
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPostingInfo = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }
        existsJobPosting = await JobPosting.create(jobPostingInfo);

        const applicationInfo = {
            resumeId : existsResume.id,
            jobPostingId : existsJobPosting.id,
            state : applicationState.SUPPORT
        }

        existsApplication = await Application.create(applicationInfo);

        const newJobSeekerInfo = {
            "email" : "rubykim22@gmail.com",
            "password" : "sadas",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }
        const password = await bcrypt.hash(newJobSeekerInfo.password, 12);
        jobSeeker = await JobSeeker.create({...newJobSeekerInfo, password});
        const newResumeInfo = {
            description: '지원자 김루비입니다!',
            career: '신입',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        };
        resume = await Resume.create(newResumeInfo);
    });

    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/auth/login/jobSeeker')
            .send({
                "email" : "rubykim22@gmail.com",
                "password" : "sadas",
            })
            .end(done);
    })

    test('지원 이력 등록', done => {
        agent
            .post('/applications')
            .send({
                resumeId : resume.id,
                jobPostingId : existsJobPosting.id,
            })
            .expect(httpStatusCode.OK, done);
    })
})