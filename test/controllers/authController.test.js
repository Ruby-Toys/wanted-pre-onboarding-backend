const {authController} = require('../../controllers');
jest.mock("../../services")
const {authService} = require("../../services");
const httpStatusCode = require("../../routes/enums/httpStatusCode");

describe('signUpJobSeeker 테스트', () => {
    const req = {}
    const res = {
        status: jest.fn(() => res),
        json : jest.fn(),
    }
    const next = jest.fn();

    test('DB 에 구직자 정보 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!';
        authService.signUpJobSeeker.mockReturnValue(Promise.reject(error))

        await authController.signUpJobSeeker(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('구직자 회원가입 성공시 가입된 정보의 이름과 이메일 응답', async () => {
        const mockReturnValue = await authService.signUpJobSeeker.mockReturnValue(Promise.resolve({
            "email" : "test229@gmail.com",
            "password" : "1234",
            "name" : "김루비",
            "phoneNumber" : "01011112222",
            "careerPeriod" : 17
        }))();

        await authController.signUpJobSeeker(req, res, next);

        expect(res.status).toBeCalledWith(httpStatusCode.OK);
        expect(res.json).toBeCalledWith({
            name: mockReturnValue.name,
            email: mockReturnValue.email
        });
    })
});



describe('signUpCompany 테스트', () => {
    const req = {}
    const res = {
        status: jest.fn(() => res),
        json : jest.fn(),
    }
    const next = jest.fn();

    test('DB 에 회사 정보 처리 중 에러 발생시 next(error) 호출', async () => {
        const error = 'error!';
        authService.signUpCompany.mockReturnValue(Promise.reject(error))

        await authController.signUpCompany(req, res, next);
        expect(next).toBeCalledWith(error);
    })

    test('회사 사용자 가입 성공시 가입된 정보의 이름과 이메일 응답', async () => {
        const mockReturnValue = await authService.signUpCompany.mockReturnValue(Promise.resolve({
            "name" : "원티드",
            "description" : "채용사이트 원티드",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.wanted.co.kr",
            "employees" : 200,
            "recruiterEmail" : "wanted@gamil.com",
            "recruiterName" : "백승수",
            "password" : "sadas",
        }))();

        await authController.signUpCompany(req, res, next);

        expect(res.status).toBeCalledWith(httpStatusCode.OK);
        expect(res.json).toBeCalledWith({
            name: mockReturnValue.name,
            recruiterName : mockReturnValue.recruiterName,
            recruiterEmail : mockReturnValue.recruiterEmail,
        });
    })
})