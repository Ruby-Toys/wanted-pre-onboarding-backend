const {authService} = require('../../services/');
const {sequelize, JobSeeker} = require("../../models");
const {existsEmailException} = require("../../exception/jobSeekerException");
const bcrypt = require("bcrypt");

const existsJobSeeker = {
    "email" : "rubykim@gmail.com",
    "password" : "sadas",
    "name" : "김루비",
    "phoneNumber" : "01011112222",
    "careerPeriod" : 17
}

beforeAll(async () => {
    await sequelize.sync({force : true});
});

describe('signUpOfJobSeeker 테스트', () => {

    beforeEach(async () => {
        await JobSeeker.destroy({truncate: true})
    })

    test('회원가입시 이미 같은 이메일의 계정이 존재하는 경우 예외 발생', async () => {
        const password = await bcrypt.hash(existsJobSeeker.password, 12);
        await JobSeeker.create({
            ...existsJobSeeker, password
        });
        const jobSeeker = {
            "email" : existsJobSeeker.email,
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
        }

        await expect(authService.signUpOfJobSeeker(jobSeeker))
            .rejects.toEqual(existsEmailException.error());
    })

    test('회원가입시 이메일 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        await expect(authService.signUpOfJobSeeker(jobSeeker))
            .rejects.toThrow();
    })

    test('회원가입시 비밀번호 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        await expect(authService.signUpOfJobSeeker(jobSeeker))
            .rejects.toThrow();
    })

    test('회원가입시 이름 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        await expect(authService.signUpOfJobSeeker(jobSeeker))
            .rejects.toThrow();
    });

    test('회원가입시 연락처 값이 비어있을 경우 에러 발생', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "name": "김개발자",
            "careerPeriod" : 17
        }

        await expect(authService.signUpOfJobSeeker(jobSeeker))
            .rejects.toThrow();
    });

    test('회원가입시 이메일이 중복되지 않으면 성공', async () => {
        const jobSeeker = {
            "email" : "rubasdykim@gmail.com",
            "password": "1234123",
            "name": "김개발자",
            "phoneNumber": "01011112222",
            "careerPeriod" : 17
        }

        await authService.signUpOfJobSeeker(jobSeeker);
    });
})

