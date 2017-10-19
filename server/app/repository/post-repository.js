/**
 * @author halab.
 */
'use strict';


const AbstractRepository = require('./abstract-repository');

class PostRepository extends AbstractRepository {

	getCollection() {
		return this.database.collection("post");
	}

}

module.exports = PostRepository;