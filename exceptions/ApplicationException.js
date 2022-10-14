const httpStatusCode = require("../routes/enums/httpStatusCode");
const wrapException = require("./wrapException");

const message = '해당 채용공고는 이미 지원한 공고입니다.';

exports.existsApplicationException = () => wrapException(httpStatusCode.FORBIDDEN, message);