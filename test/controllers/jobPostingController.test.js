const {jobPostingController} = require('../../controllers');
jest.mock("../../services")
const {jobPostingService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

describe('postJobPosting 테스트', () => {
    const now = new Date();
    const deadlineAt = new Date(now.setMonth(now.getMonth() + 1));
    const req = {
        body : {
            title: '엔드포인트 보안에이전트 개발',
            description: '소만사는 서울 영등포구 영신로에 위치하고 있으며, 개인정보보호 제품 개발 및 정보보호 컨설팅 사업을 하고 있습니다.',
            country: '대한민국',
            region: '서울',
            position: '개발,백엔드',
            requiredSkills: '자바, 스프링',
            deadlineAt,
            companyId: 1
        },
        user : {
            id : 1,
        }
    }
    const res = {
        status: jest.fn(() => res),
    }
    const next = jest.fn();

    test('DB 에 채용공고 등록 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        jobPostingService.postJobPosting.mockReturnValue(Promise.reject(error))

        await jobPostingController.postJobPosting(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('채용공고 등록 성공 후 상태코드 200 반환', async () => {
        jobPostingService.postJobPosting.mockReturnValue(Promise.resolve(true));

        await jobPostingController.postJobPosting(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
    })
})

describe('patchJobPosting 테스트', () => {
    const req = {
        body : {

        },
        params : {
            id : 1
        }
    }
    const res = {
        status: jest.fn(() => res),
    }
    const next = jest.fn();

    test('DB 에 채용공고 수정 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        jobPostingService.patchJobPosting.mockReturnValue(Promise.reject(error))

        await jobPostingController.patchJobPosting(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('채용공고 수정 성공 후 상태코드 200 반환', async () => {
        jobPostingService.patchJobPosting.mockReturnValue(Promise.resolve(true));

        await jobPostingController.patchJobPosting(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
    })

});


describe('deleteJobPosting 테스트', () => {
    const req = {
        params : {
            id : 1
        }
    };
    const res = {
        status: jest.fn(() => res),
    };
    const next = jest.fn();

    test('DB 에 채용공고 삭제 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        jobPostingService.deleteJobPosting.mockReturnValue(Promise.reject(error))

        await jobPostingController.deleteJobPosting(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('채용공고 삭제 성공 후 상태코드 200 반환', async () => {
        jobPostingService.deleteJobPosting.mockReturnValue(Promise.resolve(true));

        await jobPostingController.deleteJobPosting(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
    })

});

describe('getJobPostings 테스트', () => {
    const req = {
        query : {
            search : '원티드'
        }
    };
    const res = {
        status: jest.fn(() => res),
        json : jest.fn()
    };
    const next = jest.fn();

    test('DB 에서 채용공고 조회중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        jobPostingService.getJobPostings.mockReturnValue(Promise.reject(error))

        await jobPostingController.getJobPostings(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('채용공고 조회 성공 후 상태코드 200 과 채용공고 목록 반환', async () => {
        const mockJobPostings = ['원티드', '애플'];

        jobPostingService.getJobPostings.mockReturnValue(Promise.resolve(mockJobPostings));

        await jobPostingController.getJobPostings(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
        expect(res.json).toBeCalledWith(mockJobPostings);
    })
});