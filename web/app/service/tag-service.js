/**
 * @author halab.
 */
'use strict';


teaBlogCore.factory("TagService", ['$resource', 'ServerAddress', function ($resource, ServerAddress) {
	return $resource(ServerAddress.V1 + "tags/:tagId",
		{tagId: "@tagId"},
		{
			listTag: {
				method: "GET",
				url: ServerAddress.V1 + "tags",
			}
		}
	);
}]);