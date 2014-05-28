/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');



/**
 *	Main class of the module.
 *
 *	@param {array} config - Configuration.
 */
var Essence = function(config) {
	this._config = config || require('./config');
	this._services = {}
};



/**
 *	Fetches informations about the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 *	@return {object} - Promise.
 */
Essence.prototype.fetch = function(url, options) {
	var dfd = Q.defer();
	var error = 'Unable to find a suitable service';
	var l = this._config.length;
	var i = 0;

	var search = (function() {
		while (i < l) {
			var config = this._config[i++];

			if (config.scheme.test(url)) {
				this._service(config).fetch(url, options).then(
					function(media) {
						dfd.resolve(media);
					},
					function(e) {
						error = config.name + ': ' + e;
						search();
					}
				);

				return;
			}
		}

		dfd.reject(error);
	}).bind(this);

	search();
	return dfd.promise;
};



/**
 *	Returns an instance of the service identified by the given name.
 *
 *	@param {string} name - Service name.
 *	@param {object} config - Configuration.
 *	@return {object} - Service.
 */
Essence.prototype._service = function(config) {
	if (!(config.name in this._services)) {
		this._services[config.name] = config.service(config);
	}

	return this._services[config.name];
};



module.exports = Essence;
