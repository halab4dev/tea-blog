/**
 * @author halab.
 */
'use strict';

module.exports = {

	toLispCase : function(text) {
		return text.toLowerCase().replace(" ", "-");
	}
};