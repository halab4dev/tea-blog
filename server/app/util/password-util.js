/**
 * @author halab.
 */
'use strict';


const BCrypt = require('bcryptjs');

module.exports = {

	encryptPassword: function (password) {
		return new Promise(function (resolve, reject) {
			BCrypt.genSalt(10, function (error, salt) {
				BCrypt.hash(password, salt, function (error, hash) {
					if (error) {
						reject(error);
					}
					resolve(hash);
				});
			});
		});
	},

	comparePassword: function (password, encryptedPassword) {
		return new Promise(function (resolve, reject) {
			BCrypt.compare(password, encryptedPassword, function (error, result) {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});

	}
};