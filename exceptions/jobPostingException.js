const {httpStatusCode} = require("../routes/enums");
const wrapException = require("./wrapException");

const message = '채용공고 정보를 찾을 수 없습니다.';

exports.notfoundJobPostingException = () => wrapException(httpStatusCode.NOT_FOUND, message);