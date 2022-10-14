const {resumeService} = require('../../services');
const {sequelize, JobSeeker} = require("../../models");

let jobSeeker;

beforeAll(async () => {
    await sequelize.sync({force : true});
    const jobSeekerInfo = {
        "email" : "rubykim@gmail.com",
        "password" : "sadas",
        "name" : "김루비",
        "phoneNumber" : "01011112222",
        "careerPeriod" : 17
    }
    jobSeeker = await JobSeeker.create(jobSeekerInfo);
});

describe('postResume 테스트', () => {

    test('자기소개 값이 누락된 경우 에러 발생', async () => {
        const resume = {
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        }

        await expect(resumeService.postResume(resume)).rejects.toThrow();
    })

    test('커리어 값이 누락된 경우 에러 발생', async () => {
        const resume = {
            description: '지원자 김루비입니다!',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        }

        await expect(resumeService.postResume(resume)).rejects.toThrow();
    })

    test('스킬 값이 누락된 경우 에러 발생', async () => {
        const resume = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        }

        await expect(resumeService.postResume(resume)).rejects.toThrow();
    })

    test('존재하지 않는 사용자 id로 이력서 등록 시 에러 발생', async () => {
        const resume = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id + 99
        }

        await expect(resumeService.postResume(resume)).rejects.toThrow();
    })

    test('이력서 등록 성공', async () => {
        const resume = {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby',
            jobSeekerId: jobSeeker.id
        }

        const savedResume = await resumeService.postResume(resume);
        expect(savedResume.description).toEqual(resume.description);
    })
})