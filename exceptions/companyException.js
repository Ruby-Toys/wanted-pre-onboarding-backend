const {httpStatusCode} = require("../routes/enums");

const notFoundCompanyException = {
    message : '회사 정보를 찾을 수 없습니다.',
    status : httpStatusCode.CONFLICT,
    error : () => {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    },
}

module.exports = {
    notFoundCompanyException
}