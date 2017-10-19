/**
 * @author halab.
 */
'use strict';


const Mongo = require('mongodb');

const DateTimeUtil = require('../util/date-time-util');
const MongoDB = require('./mongodb');

class AbstractRepository {

	constructor() {
		this.database = MongoDB.getDatabase();
	}

	getCollection() {

	}

	insert(entity) {
		let collection = this.getCollection();
		let now = DateTimeUtil.now();
		entity.isDeleted = false;
		entity.createTime = now;
		entity.updateTime = now;
		return collection.insertOne(entity);
	}

	insertMany(entities) {
		let collection = this.getCollection();
		let now = DateTimeUtil.now();
		for(let i = 0; i < entities.length; i++){
			let entity = entities[i];
			entity.isDeleted = false;
			entity.createTime = now;
			entity.updateTime = now;
		}
		return collection.insertMany(entities);
	}

	list(skip, take, projection) {
		let collection = this.getCollection();
		return collection.find({isDeleted:false}, projection).skip(skip).limit(take).toArray();
	}

	findById(id) {
		let collection = this.getCollection();
		let objectId = new Mongo.ObjectId(id);
		return collection.findOne({_id: objectId});
	}
}

module.exports = AbstractRepository;