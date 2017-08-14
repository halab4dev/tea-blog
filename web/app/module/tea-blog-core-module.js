/**
 * Core module of project, which provides controllers, services... for other modules
 *
 * @author halab.
 */
'use strict';

var teaBlogCore = angular.module('teaBlogCore', [
	'ngResource', 'ngStorage',
	'angular-flash.service',
	'angular-flash.flash-alert-directive'
]);

/**
 * Setting for all request:
 * Add 'Authorization' with access token.
 * If access token expired or user info changed, get new token using refresh token.
 * If refresh token expired or user not login yet, redirect to login page.
 */
teaBlogCore.factory('CommonAPISetting', ['$rootScope', '$localStorage', '$injector', 'ServerAddress', 'ResponseCode', 'flash',
	function ($rootScope, $localStorage, $injector, ServerAddress, ResponseCode, flash) {

		return {

			request: function (config) {

				if ($localStorage.user) {
					var accessToken = $localStorage.user.accessToken;
					config.headers['Authorization'] = accessToken;
				}

				return config;
			},


			response: function (response) {
				if (response.data.code === ResponseCode.ACCESS_TOKEN_EXPIRED
					|| response.data.code === ResponseCode.USER_INFO_CHANGED) {

					//Get new token and retry request again
					var $http = $injector.get('$http');
					$http.put(
						ServerAddress.V1 + 'sessions/' + $localStorage.user.accessToken,
						{refreshToken: $localStorage.user.refreshToken}
					).then(function (newResponse) {
						$localStorage.user = newResponse.data.data;
						//retry request
						response = $http(response.config);
					});

				} else if (response.data.code === ResponseCode.UNAUTHORIZED
					|| response.data.code === ResponseCode.REFRESH_TOKEN_EXPIRED) {
					window.location.href = ServerAddress.WEB_SERVER + '/login';

				} else if (response.data.code !== ResponseCode.SUCCESS) {
					flash.error = response.data.errors[0];

				} else {
					return response;
				}
			},
		};
	}]);

/**
 * Push common API setting to interceptor.
 */
teaBlogCore.config([
	'$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('CommonAPISetting');
	}]);

/**
 * Config flash message
 */
teaBlogCore.config(['flashProvider', function (flashProvider) {
	flashProvider.errorClassnames.push('alert-danger');
	flashProvider.warnClassnames.push('alert-warning');
	flashProvider.infoClassnames.push('alert-info');
	flashProvider.successClassnames.push('alert-success');

}]);
