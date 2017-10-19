/**
 * @author halab.
 */
'use strict';


const CreateNewPostService = require('../service/post/create-new-post-service');

module.exports.setup = function (app) {

	app.post('/v1/posts', async function (request, response, next) {
			await(new CreateNewPostService(request, response).execute());
		}
	);

};