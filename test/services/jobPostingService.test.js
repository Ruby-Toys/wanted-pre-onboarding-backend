const {jobPostingService} = require('../../services');
const {sequelize, Company, JobPosting} = require("../../models");
const moment = require('moment');

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
});


describe('patchJobPosting 테스트', () => {

    let jobPosting;

    beforeAll(async () => {
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
    })

    test('존재하지 않는 채용공고 수정시 에러 발생', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 2));
        const jobPostingInfo = {
            id: jobPosting.id + 99,
            title: '엔드포인트 보안요원 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 사업을 하고 있습니다.',
            country: '대한민국',
            region: '인천',
            position: '개발,백엔드,웹개발',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        await expect(jobPostingService.patchJobPosting(jobPostingInfo)).rejects.toThrow();
    })


    test('채용공고 일부 컬럼만 수정 성공', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 2));
        const jobPostingInfo = {
            id: jobPosting.id,
            title: '엔드포인트 보안요원 개발',
            position: '개발,백엔드,웹개발',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        const result = await jobPostingService.patchJobPosting(jobPostingInfo);
        expect(result[0]).toEqual(1);

        const updatedJobPosting = await JobPosting.findOne({where: {id: jobPostingInfo.id}});
        expect(updatedJobPosting.title).toEqual(jobPostingInfo.title);
        expect(updatedJobPosting.description).toEqual(jobPosting.description);
        expect(updatedJobPosting.country).toEqual(jobPosting.country);
        expect(updatedJobPosting.region).toEqual(jobPosting.region);
        expect(updatedJobPosting.position).toEqual(jobPostingInfo.position);
        expect(updatedJobPosting.requiredSkills).toEqual(jobPostingInfo.requiredSkills);
        expect(updatedJobPosting.deadlineAt).toEqual(moment(jobPostingInfo.deadlineAt).format("YYYY-MM-DD"));
    })

    test('채용공고 수정 성공', async () => {
        const now = new Date();
        const deadlineAt = new Date(now.setMonth(now.getMonth() + 2));
        const jobPostingInfo = {
            id: jobPosting.id,
            title: '엔드포인트 보안요원 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 사업을 하고 있습니다.',
            country: '대한민국',
            region: '인천',
            position: '개발,백엔드,웹개발',
            requiredSkills: '자바, 스프링',
            deadlineAt,
        }

        const result = await jobPostingService.patchJobPosting(jobPostingInfo);
        expect(result[0]).toEqual(1);

        const updatedJobPosting = await JobPosting.findOne({where: {id: jobPostingInfo.id}});
        expect(updatedJobPosting.title).toEqual(jobPostingInfo.title);
        expect(updatedJobPosting.description).toEqual(jobPostingInfo.description);
        expect(updatedJobPosting.country).toEqual(jobPostingInfo.country);
        expect(updatedJobPosting.region).toEqual(jobPostingInfo.region);
        expect(updatedJobPosting.position).toEqual(jobPostingInfo.position);
        expect(updatedJobPosting.requiredSkills).toEqual(jobPostingInfo.requiredSkills);
        expect(updatedJobPosting.deadlineAt).toEqual(moment(jobPostingInfo.deadlineAt).format("YYYY-MM-DD"));
    })
});

describe('deleteJobPosting 테스트', () => {

    let jobPosting;

    beforeAll(async () => {
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
    })

    test('존재하지 않는 채용공고 삭제', async () => {
        const jobPostingId = jobPosting.id + 99;

        await expect(jobPostingService.deleteJobPosting(jobPostingId)).rejects.toThrow();
    })

    test('채용공고 삭제', async () => {
        const jobPostingId = jobPosting.id;

        const result = await jobPostingService.deleteJobPosting(jobPostingId);
        expect(result).toEqual(1);
    })
})