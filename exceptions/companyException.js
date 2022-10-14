const httpStatusCode = require("../routes/enums/httpStatusCode");
const wrapException = require("./wrapException");

const message = '회사 정보를 찾을 수 없습니다.';

exports.notFoundCompanyException = () => wrapException(httpStatusCode.NOT_FOUND, message);