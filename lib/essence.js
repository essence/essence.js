/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var _ = require('lodash');
var co = require('co');



/**
 *	Main class of the module.
 *
 *	@param {array} config - Configuration.
 */
var Essence = function(config) {
	this._config = config || [];
	this._services = {};
};



/**
 *	Fetches informations about the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 *	@param {function} callback - Thunk.
 */
Essence.prototype.fetch = function(url, options, callback) {
	if (_.isFunction(options)) {
		callback = options;
		options = {};
	}

	co(function *() {
		var error = 'Unable to find a suitable service';

		for (var i in this._config) {
			var config = this._config[i];

			if (config.scheme.test(url)) {
				try {
					var service = this._service(config);
					var media = yield service.fetch(url, options);

					callback(null, media);
					return;
				} catch (e) {
					error = e;
				}
			}
		};

		callback(error);
	}).call(this);
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
