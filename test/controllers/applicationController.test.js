const {applicationController} = require('../../controllers');
jest.mock("../../services")
const {applicationService} = require("../../services");
const httpStatusCode = require("../../routes/enums/httpStatusCode");

describe('postApplication 테스트', () => {
    const req = {
        body : {
            resumeId : 55,
            jobPostingId : 11,
        },
        user : {id : 1}
    }
    const res = {
        status: jest.fn(() => res),
    }
    const next = jest.fn();

    test('DB 에 지원 이력 등록 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!'
        applicationService.postApplication.mockReturnValue(Promise.reject(error))

        await applicationController.postApplication(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('지원 이력 등록 성공 후 상태코드 200 반환', async () => {
        applicationService.postApplication.mockReturnValue(Promise.resolve(true));

        await applicationController.postApplication(req, res, next);
        expect(res.status).toBeCalledWith(httpStatusCode.OK);
    })
})