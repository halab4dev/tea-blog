/**
 * @author halab.
 */
'use strict';


const AbstractResponse = require('./abstract-response');
const ResponseCode = require('./response-code');

class SuccessResponse extends AbstractResponse {

	constructor(data) {
		super(ResponseCode.SUCCESS);
		this.data = data;
	}
}

module.exports = SuccessResponse;