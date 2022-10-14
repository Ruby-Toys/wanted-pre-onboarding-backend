const httpStatusCode = require("../routes/enums/httpStatusCode");
const wrapException = require('./wrapException');

const message = '해당 이메일로 등록된 사용자가 있습니다.';

exports.existsEmailException = () => wrapException(httpStatusCode.CONFLICT, message);