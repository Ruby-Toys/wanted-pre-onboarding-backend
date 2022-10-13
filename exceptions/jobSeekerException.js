const {httpStatusCode} = require("../routes/enums");

const notFoundJobSeekerException = {
    message : '구직자의 정보를 찾을 수 없습니다.',
    status : httpStatusCode.NOT_FOUND,
    error : () => {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    },
}

module.exports = {
    notFoundJobSeekerException
}