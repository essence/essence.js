/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var Essence = require('./lib/essence');



/**
 *
 */
module.exports.init = function(providers) {
	return new Essence(providers || require('./config/providers'));
};
