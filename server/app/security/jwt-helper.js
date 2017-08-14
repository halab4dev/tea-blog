/**
 * @author halab.
 */
'use strict';


const JWT = require('jsonwebtoken');

const ApplicationException = require('../exception/application-exception');
const ResponseCode = require('../response/response-code');
const SecretKeyManager = require('./secret-key-manager');
const StringGenerator = require('../util/string-generator');

module.exports.generateToken = function (user) {
	let payload = {
		userId: user._id,
		userRole: user.role
	};
	return JWT.sign(payload, SecretKeyManager.getSecretKey(), {expiresIn: '1h'});
};

module.exports.generateRefreshToken = function () {
	return StringGenerator.randomAlphabeticString(20) + '.' + new Date().getTime();
};

module.exports.verifyToken = function (request) {
	try {
		let accessToken = request.headers.authorization;
		return JWT.verify(accessToken, SecretKeyManager.getSecretKey());
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			throw new ApplicationException(ResponseCode.ACCESS_TOKEN_EXPIRED);
		} else if (error.name === 'JsonWebTokenError') {
			throw new ApplicationException(ResponseCode.UNAUTHORIZED);
		}
	}
};