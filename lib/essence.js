/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');



/**
 *	Main class of the module.
 *
 *	@param {object} config - Configuration.
 */
var Essence = function(config = {}) {
	this._services = {}
	this._config = (config.length === 0)
		? config
		: require('./services');
};



/**
 *	Fetches informations about the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 *	@param {function} callback - Callback.
 *	@return {object} - Promise.
 */
Essence.prototype.fetch = function(url, options, callback) {
	var dfd = Q.defer();

	for (var name of this._config) {
		var config = this._config[name];

		if (config.filter.matches(url)) {
			var service = this._service(name, config);

			service.fetch(url, options).then(
				function(media) {
					if (callback) {
						callback(false, media);
					} else {
						dfd.resolve(media);
					}
				},
				function(error) {
					if (callback)
						callback(error, null);
					} else {
						dfd.reject(error);
					}
				}
			);
			break;
		}
	}

	return dfd.promise;
};



/**
 *	Returns an instance of the service identified by the given name.
 *
 *	@param {string} name - Service name.
 *	@param {object} config - Configuration.
 *	@return {object} - Service.
 */
Essence.prototype._service = function(name, config) {
	if (!(name in this._services)) {
		this._services[name] = config.factory(config);
	}

	return this._services[name];
};



module.exports = Essence;
