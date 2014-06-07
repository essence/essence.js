/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var co = require('co');



/**
 *	Main class of the module.
 *
 *	@param {array} config Services configuration.
 */
var Essence = function(config) {
	this._config = config || [];
	this._services = {};
};



/**
 *	Extracts informations about the given URL.
 *
 *	@param {string} url URL.
 *	@param {object} options Options.
 *	@param {function} callback Callback.
 *	@returns {function} Thunk.
 */
Essence.prototype.extract = function(url, options, callback) {
	if (_.isFunction(options)) {
		callback = options;
		options = {};
	}

	options || (options = {});

	var extract = co(function *() {
		var lastError = null;

		for (var i in this._config) {
			var config = this._config[i];

			if (config.scheme.test(url)) {
				try {
					var service = this._service(config);
					return yield service.extract(url, options);
				} catch (e) {
					lastError = e;
				}
			}
		}

		throw lastError || new Error('Unable to find a suitable service');
	}).bind(this);

	if (callback) {
		extract(callback);
	}

	return extract;
};



/**
 *	Returns an instance of the service identified by the given name.
 *
 *	@param {string} name Service name.
 *	@param {object} config Configuration.
 *	@returns {object} Service.
 */
Essence.prototype._service = function(config) {
	if (!(config.name in this._services)) {
		this._services[config.name] = config.service(config);
	}

	return this._services[config.name];
};



module.exports = Essence;
