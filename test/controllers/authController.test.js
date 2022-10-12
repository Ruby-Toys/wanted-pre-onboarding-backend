const {authController} = require('../../controllers');
jest.mock("../../services")
const {authService} = require("../../services");
const {httpStatusCode} = require("../../routes/enums");

describe('signUpOfJobSeeker 테스트', () => {
    const req = {}
    const res = {
        status: jest.fn(() => res),
        json : jest.fn(),
    }
    const next = jest.fn();

    test('DB 에 구직자 정보 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!';
        authService.signUpOfJobSeeker.mockReturnValue(Promise.reject(error))

        await authController.signUpOfJobSeeker(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('구직자 회원가입 성공시 가입된 정보의 이름과 이메일 응답', async () => {
        const mockReturnValue = await authService.signUpOfJobSeeker.mockReturnValue(Promise.resolve({
            "email" : "test229@gmail.com",
            "password" : "1234",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }))();

        await authController.signUpOfJobSeeker(req, res, next);

        expect(res.status).toBeCalledWith(httpStatusCode.OK);
        expect(res.json).toBeCalledWith({
            name: mockReturnValue.name,
            email: mockReturnValue.email
        });
    })
})