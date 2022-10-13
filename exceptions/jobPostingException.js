const {httpStatusCode} = require("../routes/enums");

exports.notfoundJobPostingException = {
    message : '채용공고 정보를 찾을 수 없습니다.',
    status : httpStatusCode.NOT_FOUND,
    error : () => {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    },
}