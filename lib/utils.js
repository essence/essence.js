/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');



/**
 *	Reindexes an array, according to the given map.
 *
 *	@param {object} data - The data to be reindexed.
 *	@param {object} map - A map like {'oldIndex': 'newIndex'}.
 *	@return {object} - Reindexed object.
 */
var reindex = function(data, map) {
	var reindexed = _.clone(data);

	_.each(map, function(to, from) {
		if (from in data) {
			reindexed[to] = data[from];
		}
	});

	return reindexed;
};



module.exports = {
	'reindex': reindex
};
