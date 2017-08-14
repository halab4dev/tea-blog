/**
 * @author halab.
 */
'use strict';


const MongoClient = require('mongodb').MongoClient;

const Configuration = require('../../config');

let database;

module.exports = {

	connect: async function () {
		let connectUrl = 'mongodb://' + Configuration.DB_SERVER + ':' + Configuration.DB_PORT + '/' + Configuration.DB_NAME;
		database = await
			MongoClient.connect(connectUrl);
	},

	getDatabase: function () {
		return database;
	},

	close: function () {
		database.close();
	}
};
