/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var util = require('util');
var Presenter = require('../presenter');



/**
 *	{@inheritDoc}
 */
var Reindexer = function(map) {
	this._map = map;
};

util.inherits(Reindexer, Presenter);



/**
 *	{@inheritDoc}
 */
Reindexer.prototype.apply = function(infos) {
	_.each(this._map, function(to, from) {
		if (from in infos) {
			infos[to] = infos[from];
		}
	});

	return infos;
};



module.exports = Reindexer;
