const {httpStatusCode} = require("../routes/enums");

exports.existsEmailException = {
    message : '해당 이메일로 등록된 사용자가 있습니다.',
    status : httpStatusCode.CONFLICT,
    error : () => {
        const error = new Error(this.message);
        error.status = this.status;
        return error;
    },
}