const {resumeController, authController} = require('../../controllers');
jest.mock("../../services")
const {resumeService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

describe('postResume 테스트', () => {
    const req = {
        body : {
            description: '지원자 김루비입니다!',
            career: '엠브이소프텍 1년 7개월 근무',
            skills: '자바, 스프링',
            linkUrl: 'https://github.com/MisterRuby'
        },
        user : {
            id : 1,
        }
    }
    const res = {
        status: jest.fn(() => res),
    }
    const next = jest.fn();

    test('DB 에 이력서 등록 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        resumeService.postResume.mockReturnValue(Promise.reject(error))

        await resumeController.postResume(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('이력서 등록 성공 후 상태코드 200 반환', async () => {
        resumeService.postResume.mockReturnValue(Promise.resolve(true));

        await resumeController.postResume(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
    })
})