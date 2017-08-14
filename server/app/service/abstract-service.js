/**
 * @author halab.
 */
'use strict';


const ErrorResponse = require('../response/error-response');
const SuccessResponse = require('../response/sucess-response');
const ResponseCode = require('../response/response-code');

class AbstractService {

	constructor(request, response) {
		this.request = request;
		this.response = response;
	}

	async execute() {
		let response;
		try {
			await this.preExecute();
			let errors = await this.validateData();
			if (errors && errors.length > 0) {
				response = new ErrorResponse(ResponseCode.BAD_REQUEST, errors);
			} else {
				let responseData = await this.inExecute();
				response = new SuccessResponse(responseData);
			}
		} catch (error) {
			console.log(error);
			if (error.code) {
				response = new ErrorResponse(error.code);
			} else {
				response = new ErrorResponse(ResponseCode.INTERNAL_SERVER_ERROR);
			}
		}
		await this.afterExecute(response);
		return response;
	}

	async preExecute() {
		console.log('Request: ');
		console.log(this.request.body);
	}

	/**
	 * Validate data of the request
	 *
	 * @returns {Promise.<void>}
	 */
	async validateData() {

	}

	async inExecute() {

	}

	async afterExecute(responseData) {
		console.log(responseData);
		this.response.json(responseData);
	}
}

module.exports = AbstractService;