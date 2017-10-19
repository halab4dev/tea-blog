/**
 * @author halab.
 */
'use strict';

teaBlogCore.factory("StringUtils", [function () {
	return {

		isEmpty: function (string) {
			return string === undefined || string.length === 0;
		},

		isBlank: function (string) {
			return string === undefined || string.replace(/\s/g, "").length === 0;
		}

	};
}]);