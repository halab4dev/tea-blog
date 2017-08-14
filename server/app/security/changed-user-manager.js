/**
 * @author halab.
 */
'use strict';


const API_PERMISSION_MAP = new Map();

module.exports = {

	add: function (userId) {
		API_PERMISSION_MAP.set(userId, userId);
	},

	remove: function (userId) {
		API_PERMISSION_MAP.delete(userId);
	},

	isChanged: function (userId) {
		return API_PERMISSION_MAP.has(userId);
	},

	clear: function (userId) {
		API_PERMISSION_MAP.clear();
	},

}