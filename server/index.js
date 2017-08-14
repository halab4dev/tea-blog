/**
 * @author halab.
 */
'use strict';


const Server = require('./app/server');
const Installer = require('./installer');
const MongoDB = require('./app/repository/mongodb');
const UserDAO = require('./app/repository/user-repository');


let getOwner = async function (database) {
	return new UserDAO().getOwner();
};

let connectToDB = async function () {
	return MongoDB.connect();
};

let startServer = function () {
	Server.start();
};

let start = async function () {
	await
		connectToDB();
	let hasOwner = await
		getOwner();
	if (!hasOwner) {
		await
			Installer.install();
	}
	startServer();
};

start();