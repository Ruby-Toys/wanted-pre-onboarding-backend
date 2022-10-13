const {applicationService} = require('../../services');
const {sequelize, Resume, JobSeeker, Company, JobPosting} = require("../../models");

let resume;
let jobPosting;

beforeAll(async () => {
    await sequelize.sync({force : true});
    const jobSeekerInfo = {
        "email" : "rubykim@gmail.com",
        "password" : "sadas",
        "name" : "김루비",
        "phoneNumber" : "01011112222",
        "careerPeriod" : 17
    }
    const jobSeeker = await JobSeeker.create(jobSeekerInfo);
    const resumeInfo = {
        description: '지원자 김루비입니다!',
        career: '엠브이소프텍 1년 7개월 근무',
        skills: '자바, 스프링',
        linkUrl: 'https://github.com/MisterRuby',
        jobSeekerId: jobSeeker.id
    };
    resume = Resume.create(resumeInfo);
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
    const company = await Company.create(companyInfo);
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
    jobPosting = await JobPosting.create(jobPostingInfo);
});

describe('postApplication 테스트', () => {

    test('존재하지 않는 이력서 id로 지원 이력 등록시 에러 발생', async () => {
        const application = {
            resumeId : resume.id + 9,
            jobPostingId : jobPosting.id,
        }

        await expect(applicationService.postApplication(application)).rejects.toThrow();
    })

    test('지원 이력 채용공고 id 값이 누락된 경우 에러 발생', async () => {
        const application = {
            resumeId : resume.id,
            jobPostingId : jobPosting.id + 9,
        }

        await expect(applicationService.postApplication(application)).rejects.toThrow();
    })

    test('지원 이력 등록 성공', async () => {
        const application = {
            resumeId : resume.id,
            jobPostingId : jobPosting.id,
        }

        const savedApplication = await applicationService.postApplication(application);
        expect(savedApplication.resumeId).toEqual(application.resumeId);
        expect(savedApplication.jobPostingId).toEqual(application.jobPostingId);
    })
})