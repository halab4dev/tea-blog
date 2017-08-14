/**
 * @author halab.
 */
'use strict';


const StringGenerator = require('../util/string-generator');

let secretKey = StringGenerator.randomAlphabeticString(10);

module.exports.getSecretKey = function () {
	return secretKey;
};