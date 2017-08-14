/**
 * @author halab.
 */
'use strict';


const ALPHABETIC_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const NUMERIC_STRING = '0123456789';

let randomString = function (sourceString, length) {
	let result = '';
	for (let i = 0; i < length; i++) {
		let randomIndex = Math.floor((Math.random() * sourceString.length));
		result += sourceString[randomIndex];
	}
	return result;
};

module.exports.randomAlphabeticString = function (length) {
	return randomString(ALPHABETIC_STRING, length);
};

module.exports.randomNumericString = function (length) {
	return randomString(NUMERIC_STRING, length);
};