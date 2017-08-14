/**
 * @author halab.
 */
'use strict';


const JWTHelper = require('./jwt-helper');

const APIName = require('../constant/api-name');
const ApplicationException = require('../exception/application-exception');
const ChangedUserManager = require('./changed-user-manager');
const ResponseCode = require('../response/response-code');
const UserRole = require('../constant/user-role');

const API_PERMISSION_MAP = new Map([
]);

let hasPermission = function (apiName, role) {
	return API_PERMISSION_MAP.get(apiName).indexOf(role) >= 0;
};

module.exports.check = function (request, apiName) {
	let decoded = JWTHelper.verifyToken(request);
	request.body.userId = decoded.userId;
	request.body.userRole = decoded.userRole;
	if (ChangedUserManager.isChanged(request.body.userId)) {
		throw new ApplicationException(ResponseCode.USER_INFO_CHANGED);
	}
	if (!hasPermission(apiName, request.body.userRole)) {
		throw new ApplicationException(ResponseCode.PERMISSION_DENIED);
	}
};