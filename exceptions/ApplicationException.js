const {httpStatusCode} = require("../routes/enums");

exports.existsApplicationException = {
    message : '해당 채용공고는 이미 지원한 공고입니다.',
    status : httpStatusCode.FORBIDDEN,
    error : () => {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    },
}