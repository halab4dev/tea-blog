/**
 * @author halab.
 */
'use strict';


module.exports = {

	isValid: function (object) {
		return object !== undefined && object !== null;
	},

	areValid: function () {
		for (let i = 0; i < arguments.length; i++) {
			if (!this.isValid(arguments[i])) {
				return false;
			}
		}
		return true;
	},

	isValidString: function (string) {
		return typeof string === 'string' && this.isValid(string) && string.length !== 0;
	},

	areValidString: function () {
		for (let i = 0; i < arguments.length; i++) {
			if (!this.isValidString(arguments[i])) {
				return false;
			}
		}
		return true;
	},
};