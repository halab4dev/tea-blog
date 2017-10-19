/**
 * @author halab.
 */
'use strict';


const AbstractRepository = require('./abstract-repository');

const TAG_COLLECTION = 'tag';

class TagRepository extends AbstractRepository {

	getCollection() {
		return this.database.collection(TAG_COLLECTION);
	}

	list(skip, take) {
		let projection = {
			name: 1,
			url: 1,
			postNumber: 1,
			_id: 0
		};
		return super.list(skip, take, projection);
	}

	listAllTag() {
		let collection = this.getCollection();
		return new Promise(async function (resolve, reject) {
			let result = new Map();
			let cursor = await collection.find({});
			await cursor.forEach(function (tag) {
				result.set(tag.url, tag);
			}, function (error) {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}

	increasePostNumberOfTags(tagUrls) {
		let query = {
			url: {$in: tagUrls}
		};
		let update = {
			$inc: {postNumber: 1}
		};
		let collection = this.getCollection();
		return collection.updateMany(query, update);
	}

}

module.exports = TagRepository;