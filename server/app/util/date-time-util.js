/**
 * @author halab.
 */
'use strict';


module.exports = {

	now: function () {
		return new Date();
	},

	aMonthLater: function () {
		let result = this.now();
		result.setMonth(result.getMonth() + 1);
		return result;
	}
};