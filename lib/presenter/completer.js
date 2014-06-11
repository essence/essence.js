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
var Completer = function(defaults) {
	this._defaults = _.merge({
		width: 800,
		height: 600
	}, defaults || {});
};

util.inherits(Completer, Presenter);



/**
 *	{@inheritDoc}
 */
Completer.prototype.apply = function(infos) {
	return _.defaults(infos, this._defaults);
};



module.exports = Completer;
