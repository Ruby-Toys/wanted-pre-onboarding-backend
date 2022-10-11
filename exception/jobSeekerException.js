const {httpStatusCode} = require("../routes/enums");

const existsEmailException = () => {
    const error = new Error('해당 이메일로 등록된 사용자가 있습니다.');
    error.status = httpStatusCode.CONFLICT;
    throw error;
}

module.exports = {
    existsEmailException
}