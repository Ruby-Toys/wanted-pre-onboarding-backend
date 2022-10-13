const {jobPostingService, resumeService} = require('../../services');
const {sequelize, Resume, JobSeeker, Company} = require("../../models");
const {notFoundCompanyException} = require("../../exceptions/companyException");

let company;

beforeAll(async () => {
    await sequelize.sync({force : true});
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
    company = await Company.create(companyInfo);
});

describe('postJobPosting 테스트', () => {

    test('채용공고 제목 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 공고내용 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 근무 국가 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 근무 지역 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 포지션 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 요구 스킬 값이 누락된 경우 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            deadlineAt,
            companyId: company.id
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('존재하지 않는 회사 id로 채용공고 등록시 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id + 99
        }

        await expect(jobPostingService.postJobPosting(jobPosting)).rejects.toThrow();
    })

    test('채용공고 등록 성공', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
        const jobPosting = {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: company.id
        }

        const savedJobPosting = await jobPostingService.postJobPosting(jobPosting);
        expect(savedJobPosting.title).toEqual(jobPosting.title);
    })
})