/**
 * @author halab.
 */
'use strict';


const APIName = require('../../constant/api-name');
const UnauthenticatedService = require('../unauthenticated-service');
const TagRepository = require('../../repository/tag-repository');
const Validator = require('../../util/validator');

let tagRepository;

class ListTagsService extends UnauthenticatedService {

	constructor(request, response) {
		super(request, response);
		this.name = APIName.LIST_TAGS;
		tagRepository = new TagRepository();
	}

	async validateData() {
		let data = this.request.query;
		let skip = parseInt(data.skip);
		let take = parseInt(data.take);

		let errors = [];
		if (!Validator.isInteger(skip)) {
			errors.push('Skip parameter must be a number');
		}
		if (!Validator.isInteger(take)) {
			errors.push('Take parameter must be a number');
		}
		return errors;
	}

	async inExecute() {
		let data = this.request.query;
		let skip = parseInt(data.skip);
		let take = parseInt(data.take);

		let tags = await listTags(skip, take);

		return {
			tags: tags
		};
	}
}

let listTags = async function (skip, take) {
	return tagRepository.list(skip, take)
};

module.exports = ListTagsService;