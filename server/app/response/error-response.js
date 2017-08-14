/**
 * @author halab.
 */
'use strict';


const AbstractResponse = require('./abstract-response');
const ErrorMessage = require('./error-message');

class ErrorResponse extends AbstractResponse {

	constructor(code, errors) {
		super(code);
		this.errors = createErrorsMessage(code, errors);
	}
}

let createErrorsMessage = function (code, errors) {
	if (errors) {
		return errors;
	}
	return ErrorMessage.getErrorMessage(code);
}

module.exports = ErrorResponse;