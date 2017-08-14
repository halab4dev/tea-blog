/**
 * @author halab.
 */
'use strict';


const LoginService = require('../service/session/login-service');
const RefreshTokenService = require('../service/session/refresh-token-service');

module.exports.setup = function (app) {

	app.post('/v1/sessions', async function (request, response, next) {
			await(new LoginService(request, response).execute());
		}
	)
	;

	app.put('/v1/sessions/:token', async function (request, response) {
			await(new RefreshTokenService(request, response).execute());
		}
	)
	;

};