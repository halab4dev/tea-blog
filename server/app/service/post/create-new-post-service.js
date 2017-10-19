/**
 * @author halab.
 */
'use strict';


const APIName = require('../../constant/api-name');
const PostRepository = require('../../repository/post-repository');
const StringUtil = require('../../util/string-util');
const TagRepository = require('../../repository/tag-repository');
const UnauthenticatedService = require('../unauthenticated-service');
const Validator = require('../../util/validator');

let tagRepository;
let postRepository;

class CreateNewPostService extends UnauthenticatedService {

	constructor(request, response) {
		super(request, response);
		this.name = APIName.CREATE_NEW_POST;
		tagRepository = new TagRepository();
		postRepository = new PostRepository();
	}

	async validateData() {
		let data = this.request.body;
		let title = data.title;
		let content = data.content;
		let publicType = data.publicType;

		let errors = [];
		if (!Validator.isValidString(title)) {
			errors.push('Title can not be empty');
		}
		if (!Validator.isValidString(content)) {
			errors.push('Content can not be empty');
		}
		if (!Validator.isValidPublicType(publicType)) {
			errors.push('Invalid public type');
		}
		return errors;
	}

	async inExecute() {
		let data = this.request.body;
		let tags = data.tags;

		if(Validator.isValid(tags)){
			await processTags(tags);
		}

		let post = {
			title: data.title,
			content: data.content,
			publicType: data.publicType,
			viewNumber: 0,
			tags: getTagsUrl(tags)
		};

		await savePost(post);
	}
}

let processTags = async function (postTags) {
	let allTags = await listAllTags();
	let categorizedPostTags = categorizeTags(allTags, postTags);
	await increasePostNumberOfTags(categorizedPostTags.existedTags);
	await createNewTags(categorizedPostTags.newTags);
	return postTags;
};

let listAllTags = async function () {
	return tagRepository.listAllTag();
};

/**
 * Categorize post tags to 2 type: existed tags and new tags
 * @param allTags all tags that existed
 * @param postTags tags of post
 * @returns {{existedTags: Array, newTags: Array}}
 */
let categorizeTags = function (allTags, postTags) {
	let existedTags = [];
	let newTags = [];

	for(let i = 0; i < postTags.length; i++){
		let tag = postTags[i];

		// remove tag if it's name is empty
		if(!Validator.isValidString(tag.name)){
			postTags.splice(i, 1);
			continue;
		}

		tag.url = StringUtil.toLispCase(tag.name);
		if(allTags.has(tag.url)) {
			existedTags.push(tag);
		} else {
			newTags.push(tag);
		}
	}
	return {
		existedTags: existedTags,
		newTags: newTags
	}
};

let increasePostNumberOfTags = async function (tags) {
	if (tags.length === 0) {
		return;
	}
	let tagsUrl = getTagsUrl(tags);
	return tagRepository.increasePostNumberOfTags(tagsUrl);
};

let createNewTags = async function (tags) {
	if (tags.length === 0) {
		return;
	}
	for (let i = 0; i < tags.length; i++) {
		let tag = tags[i];
		tag.postNumber = 1;
	}
	return tagRepository.insertMany(tags);
};

let getTagsUrl = function(tags) {
	let tagsUrl = [];
	for(let i = 0; i < tags.length; i++){
		let tag = tags[i];
		tagsUrl.push(tag.url);
	}
	return tagsUrl;
};

let savePost = async function (post) {
	return postRepository.insert(post);
};

module.exports = CreateNewPostService;