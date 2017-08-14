/**
 * @author halab.
 */
'use strict';


const APIName = require('../../constant/api-name');
const ApplicationException = require('../../exception/application-exception');
const JWTHelper = require('../../security/jwt-helper');
const PasswordUtil = require('../../util/password-util');
const ResponseCode = require('../../response/response-code');
const UnauthenticatedService = require('../unauthenticated-service');
const UserRepository = require('../../repository/user-repository');
const Validator = require('../../util/validator');

let userRepository;

class LoginService extends UnauthenticatedService {

	constructor(request, response) {
		super(request, response);
		this.name = APIName.LOGIN;
		userRepository = new UserRepository();
	}

	async validateData() {
		let data = this.request.body;
		let username = data.username;
		let password = data.password;

		let errors = [];
		if (!Validator.isValidString(username)) {
			errors.push('Invalid username');
		}
		if (!Validator.isValidString(password)) {
			errors.push('Invalid password');
		}
		return errors;
	}

	async inExecute() {
		let data = this.request.body;
		let username = data.username;
		let password = data.password;

		let user = await getUser(username, password);
		let refreshToken = JWTHelper.generateRefreshToken();
		await updateRefreshToken(username, refreshToken);

		return {
			userId: user._id,
			username: user.username,
			role: user.role,
			accessToken: JWTHelper.generateToken(user),
			refreshToken: refreshToken,
		};
	}
}

let getUser = async function (username, password) {
	let user = await userRepository.findByUsername(username);
	if (Validator.isValid(user) && await PasswordUtil.comparePassword(password, user.password)
	) {
		return user;
	}
	throw new ApplicationException(ResponseCode.INCORRECT_EMAIL_OR_PASSWORD);
};

let updateRefreshToken = async function (username, refreshToken) {
	return userRepository.updateRefreshToken(username, refreshToken)
};

module.exports = LoginService;