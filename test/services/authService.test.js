const {authService} = require('../../services/');
const {sequelize, JobSeeker, Company} = require("../../models");

describe('signUpJobSeeker 테스트',  () => {

    const existsJobSeeker = {
        "email" : "rubykim@gmail.com",
        "password" : "sadas",
        "name" : "김루비",
        "phoneNumber" : "01011112222",
        "careerPeriod" : 17
    }

    beforeAll(async () => {
        await sequelize.sync({force : true});
        await JobSeeker.create(existsJobSeeker);
    });

    test('회원가입시 이미 같은 이메일의 계정이 존재하는 경우 예외 발생',  async () => {
        const jobSeeker = {
            "email" : existsJobSeeker.email,
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
        }

        await expect(authService.signUpJobSeeker(jobSeeker)).rejects.toThrow();
    })

    test('회원가입시 이메일 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        await expect(authService.signUpJobSeeker(jobSeeker)).rejects.toThrow();
    })

    test('회원가입시 비밀번호 값이 비어있을 경우 에러 발생',  async () => {
        const jobSeeker = {
            "email": "rubasdykim@gmail.com",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod": 17
        }

        return expect(authService.signUpJobSeeker(jobSeeker)).rejects.toThrow();
    })

    test('회원가입시 이름 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        return expect(authService.signUpJobSeeker(jobSeeker)).rejects.toThrow();
    });

    test('회원가입시 연락처 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "name": "김개발자",
            "careerPeriod" : 17
        }

        return expect(authService.signUpJobSeeker(jobSeeker)).rejects.toThrow();
    });

    test('회원가입시 이메일이 중복되지 않으면 성공', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        const savedJobSeeker = await authService.signUpJobSeeker(jobSeeker);
        expect(savedJobSeeker.email).toEqual(jobSeeker.email);
    });
})


describe('signUpCompany 테스트', () => {

    const existsCompany = {
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

    beforeAll(async () => {
        await sequelize.sync({force : true});
        await Company.create(existsCompany)
    });

    test('회사 등록시 이미 같은 이메일의 담당자 이메일이 존재하는 경우 예외 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : existsCompany.recruiterEmail,
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    })

    test('회사 등록시 이름 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 회사 소개 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 국가 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 지역 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 직원 수 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 채용 담당자 이메일 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    })

    test('회사 등록시 비밀번호 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    })

    test('회사 등록시 채용 담당자명 값이 비어있을 경우 에러 발생', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "password" : "asdwqdsadasd",
        }

        await expect(authService.signUpCompany(company)).rejects.toThrow();
    });

    test('회사 등록시 이메일이 중복되지 않으면 성공', async () => {
        const company = {
            "name" : "당근마켓",
            "description" : "중고거래 플랫폼",
            "country" : "대한민국",
            "region" : "서울",
            "linkUrl" : "https://www.daangn.com/",
            "employees" : 150,
            "recruiterEmail" : "daangn@gamil.com",
            "recruiterName" : "백승수",
            "password" : "asdwqdsadasd",
        }

        const savedCompany = await authService.signUpCompany(company);
        expect(savedCompany.recruiterEmail).toEqual(company.recruiterEmail);
    });
});