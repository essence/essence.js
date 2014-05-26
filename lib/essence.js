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
	var error = '';
	var l = this._config.length;
	var i = 0;

	var step = function() {
		for (; i < l; ++i) {
			var config = this._config[i];

			if (config.filter.matches(url)) {
				var service = this._service(config);

				service.fetch(url, options).then(
					function(media) {
						if (callback) {
							callback(false, media);
						} else {
							dfd.resolve(media);
						}
					},
					function(e) {
						error = e;
						step();
					}
				);

				return;
			}
		}

		if (callback)
			callback(error, null);
		} else {
			dfd.reject(error);
		}
	}

	step();
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
		this._services[config.name] = config.factory(config);
	}

	return this._services[config.name];
};



module.exports = Essence;
