/**
 * @author halab.
 */
'use strict';


const APIName = require('../../constant/api-name');
const ApplicationException = require('../../exception/application-exception');
const JWTHelper = require('../../security/jwt-helper');
const ResponseCode = require('../../response/response-code');
const UnauthenticatedService = require('../unauthenticated-service');
const UserRepository = require('../../repository/user-repository');
const Validator = require('../../util/validator');

let userRepository;

class RefreshTokenService extends UnauthenticatedService {

	constructor(request, response) {
		super(request, response);
		this.name = APIName.REFRESH_TOKEN;
		userRepository = new UserRepository();
	}

	async validateData() {
		let data = this.request.body;
		let refreshToken = data.refreshToken;

		let errors = [];
		if (!Validator.isValidString(refreshToken)) {
			errors.push('Invalid refresh token');
		}
		return errors;
	}

	async inExecute() {
		let data = this.request.body;
		let refreshToken = data.refreshToken;

		let user = await findByRefreshToken(refreshToken);

		return {
			userId: user._id,
			username: user.username,
			role: user.role,
			accessToken: JWTHelper.generateToken(user),
			refreshToken: user.refreshToken.token
		};
	}
}

let findByRefreshToken = async function (refreshToken) {
	let user = await userRepository.findByRefreshToken(refreshToken);
	if (Validator.isValid(user)) {
		return user;
	}
	throw new ApplicationException(ResponseCode.REFRESH_TOKEN_EXPIRED);
};

module.exports = RefreshTokenService;