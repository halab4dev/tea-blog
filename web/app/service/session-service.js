/**
 * @author halab.
 */
'use strict';

teaBlogCore.factory("SessionService", ['$resource', 'ServerAddress', function ($resource, ServerAddress) {
	return $resource(ServerAddress.V1 + "sessions/:sessionId",
		{sessionId: "@sessionId"},
		{
			login: {
				method: "POST",
				url: ServerAddress.V1 + "sessions",
			},

			refreshToken: {
				method: "PUT"
			},
		}
	);
}]);