/**
 * @author halab.
 */
'use strict';


const ListTagsService = require('../service/tag/list-tags-service');

module.exports.setup = function (app) {

	app.get('/v1/tags', async function (request, response, next) {
			await(new ListTagsService(request, response).execute());
		}
	);

};