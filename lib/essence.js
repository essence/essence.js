/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var co = require('co');



/**
 *	Main class of the module.
 *
 *	@param {array} config Providers configuration.
 */
var Essence = function(config) {
	this._config = config || [];
	this._providers = {};
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
					var provider = this._provider(config);
					return yield provider.extract(url, options);
				} catch (e) {
					lastError = e;
				}
			}
		}

		throw lastError || new Error('Unable to find a suitable provider');
	}).bind(this);

	if (callback) {
		extract(callback);
	}

	return extract;
};



/**
 *	Returns an instance of the provider identified by the given name.
 *
 *	@param {string} name Provider name.
 *	@param {object} config Configuration.
 *	@returns {object} Provider.
 */
Essence.prototype._provider = function(config) {
	if (!(config.name in this._providers)) {
		this._providers[config.name] = config.provider(config);
	}

	return this._providers[config.name];
};



module.exports = Essence;
