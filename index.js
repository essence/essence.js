/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Essence = require('./lib/essence');
var services = require('./config/services');



/**
 *
 */
module.exports = new Essence(services);
