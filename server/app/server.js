/**
 * @author halab.
 */
'use strict';

const Express = require('express');
const BodyParser = require('body-parser');
const CORS = require('cors');

const Configuration = require('../config');
const PostRouter = require('./router/post-router');
const SessionRouter = require('./router/session-router');
const TagRouter = require('./router/tag-router');


let app = Express();

let configServer = function () {
	app.use(BodyParser.json());         // to support JSON-encoded bodies
	app.use(BodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	}));
	app.use(CORS());
};

let initServices = function () {
	PostRouter.setup(app);
	SessionRouter.setup(app);
	TagRouter.setup(app);
};

let setupErrorHandler = function () {
	app.use(function (error, request, response, next) {
		console.log(error.message);
		response.json({code: 500});
	});
};

module.exports.start = function () {
	configServer();
	initServices();
	setupErrorHandler();
	let server = app.listen(Configuration.SERVER_PORT, function () {
		console.log("Server is running on port %s...", server.address().port);
	})
};