/**
 * @author halab.
 */
'use strict';


const ResponseCode = require('./response-code');

const ERROR_MESSAGE_MAP = new Map([
	[ResponseCode.UNAUTHORIZED, ['Unauthorized or invalid access token']],
	[ResponseCode.INCORRECT_EMAIL_OR_PASSWORD, ['Incorrect email or password']],
	[ResponseCode.ACCESS_TOKEN_EXPIRED, ['Access token expired']],
	[ResponseCode.REFRESH_TOKEN_EXPIRED, ['Refresh token expired']],
	[ResponseCode.USER_INFO_CHANGED, ['User info changed']],
	[ResponseCode.INTERNAL_SERVER_ERROR, ['Internal server error']],
]);

module.exports.getErrorMessage = function (code) {
	return ERROR_MESSAGE_MAP.get(code);
};