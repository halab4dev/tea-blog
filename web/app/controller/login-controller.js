/**
 * @author halab.
 */
'use strict';

teaBlogCore.controller('LoginController', ['$scope', '$localStorage', 'SessionService', 'ServerAddress',
	function ($scope, $localStorage, SessionService, ServerAddress) {

		$scope.login = function () {
			SessionService.login($scope.account).$promise.then(function (response) {
				$localStorage.user = response.data;
				window.location.href = ServerAddress.WEB_SERVER + '/admin';
			})
		};
	}]);