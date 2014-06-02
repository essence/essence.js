/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var Essence = require('./lib/essence');



/**
 *
 */
module.exports.init = function(services) {
	return new Essence(services || require('./config/services'));
};
