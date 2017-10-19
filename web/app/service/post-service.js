/**
 * @author halab.
 */
'use strict';


teaBlogCore.factory("PostService", ['$resource', 'ServerAddress', function ($resource, ServerAddress) {
	return $resource(ServerAddress.V1 + "posts/:postId",
		{postId: "@postId"},
		{
			listPost: {
				method: "GET",
				url: ServerAddress.V1 + "posts",
			},

			createPost: {
				method: "POST",
				url: ServerAddress.V1 + "posts",
			}
		}
	);
}]);