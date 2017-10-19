/**
 * @author halab.
 */
'use strict';

teaBlogCore.factory("DateTimeUtil", [function () {

	function convertTo2DigitNumber(number) {
		return number < 10 ? '0' + number : number;
	}

	function convertTo4DigitNumber(number) {
		if (number >= 1000) {
			return number;
		} else if (number >= 100 && number < 1000) {
			return '0' + number;
		} else if (number >= 10 && number < 100) {
			return '00' + number;
		} else {
			return '000' + number;
		}
	}

	return {

		toStringYYYYMMddhhmmss: function (dateTime) {
			let year = convertTo4DigitNumber(dateTime.getFullYear());
			let month = convertTo2DigitNumber(dateTime.getMonth() + 1);
			let day = convertTo2DigitNumber(dateTime.getDate());
			let hours = convertTo2DigitNumber(dateTime.getHours());
			let minutes = convertTo2DigitNumber(dateTime.getMinutes());
			let seconds = convertTo2DigitNumber(dateTime.getSeconds());
			return '' + year + month + day + hours + minutes + seconds;
		},

		fromStringYYYYMMddhhmmss: function (string) {
			let year = string.substr(0, 4);
			let month = string.substr(4, 2) - 1;
			let day = string.substr(6, 2);
			let hours = string.substr(8, 2);
			let minutes = string.substr(10, 2);
			let seconds = string.substr(12);
			return new Date(year, month, day, hours, minutes, seconds, 0);
		}
	}
}]);