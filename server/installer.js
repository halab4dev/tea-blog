/**
 * @author halab.
 */
'use strict';


const ReadLine = require('readline');

const UserRepository = require('./app/repository/user-repository');
const PasswordUtil = require('./app/util/password-util');
const ConsolePrinter = require('./app/util/console-printer');

let createReader = function () {
	return ReadLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});
};

let getUserInfo = async function (reader, infoName) {
	return new Promise(function (resolve, reject) {
		let message = 'Enter your ' + infoName + ': ';
		reader.question(message, function (infoValue) {
			resolve(infoValue);
		});
	});
};

let encryptPassword = async function (password) {
	return PasswordUtil.encryptPassword(password);
};

let saveOwnerInfo = async function (info) {
	return new UserRepository().insertOwner(info);
};

let install = async function () {
	ConsolePrinter.cyan('Start install ...');
	let reader = createReader();
	let info = {};

	info.username = await
		getUserInfo(reader, 'username');
	info.email = await
		getUserInfo(reader, 'email');
	info.password = await
		encryptPassword(await
			getUserInfo(reader, 'password')
		)
	;

	await
		saveOwnerInfo(info);

	reader.close();
	ConsolePrinter.green('Install successfully!');
};

module.exports = {

	install: install,
};
