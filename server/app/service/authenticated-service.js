/**
 * @author halab.
 */
'use strict';


const AbstractService = require('./abstract-service');
const PermissionChecker = require('../security/permission-checker');

class AuthenticatedService extends AbstractService {

	async preExecute() {
		await this.checkPermission();
		await super.preExecute();
	}

	async checkPermission() {
		PermissionChecker.check(this.request, this.name);
	}
}

module.exports = AuthenticatedService;