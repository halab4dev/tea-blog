/**
 * @author halab.
 */
'use strict';


const AbstractRepository = require('./abstract-repository');
const DateTimeUtil = require('../util/date-time-util');
const UserRole = require('./../constant/user-role');

const USER_COLLECTION = 'user';

class UserDAO extends AbstractRepository {

	getCollection() {
		return this.database.collection(USER_COLLECTION);
	}

	insertOwner(info) {
		info.role = UserRole.OWNER;
		return this.insert(info);
	}

	getOwner() {
		let query = {
			role: UserRole.OWNER,
			isDeleted: false,
		};
		return this.getCollection().findOne(query);
	}

	findByUsername(username) {
		return this.getCollection().findOne({username: username});
	}

	updateRefreshToken(username, refreshToken) {
		return this.getCollection().update(
			{username: username},
			{
				$set: {
					refreshToken: {
						token: refreshToken,
						expiredAt: DateTimeUtil.aMonthLater(),
					}
				}
			}
		);
	}

	findByRefreshToken(refreshToken) {
		return this.getCollection().findOne(
			{
				'refreshToken.token': refreshToken,
				'refreshToken.expiredAt': {$gt: DateTimeUtil.now()}
			}
		);
	}
}

module.exports = UserDAO;
