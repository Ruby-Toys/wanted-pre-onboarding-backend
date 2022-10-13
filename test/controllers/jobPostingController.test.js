const {jobPostingController} = require('../../controllers');
jest.mock("../../services")
const {jobPostingService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

describe('postJobPosting 테스트', () => {
    const req = {
        body : {
            "name" : "원티드",
            "description" : "채용사이트 원티드",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.wanted.co.kr",
            "employees" : 200,
            "recruiterEmail" : "wanted@gamil.com",
            "recruiterName" : "백승수",
            "password" : "sadas",
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