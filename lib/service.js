/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var Request = require('request');



/**
 *	A service providing embed informations.
 *
 *	@param {object} options Options:
 *		- {object} map Map to reindex informations after fetching
 */
var Service = function(options) {
	this._options = _.extend({
		map: {}
	}, options);
};



/**
 *	Fetches informations from the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype.fetch = function *(url, options) {
	url = this._prepareUrl(url, options);

	var infos = yield this._fetch(url, options);
	infos.url = infos.url || url;

	return this._completeInfos(
		this._reindexInfos(infos),
		options
	);
};



/**
 *	Actually fetches informations.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype._fetch = function *(url, options) {
	throw new Error('Not implemented.');
};



/**
 *	Fetches and returns the contents of the page at the given URL.
 *
 *	@param {string} url - URL.
 *	@param {string} - Contents.
 */
Service.prototype._get = function(url) {
	return function(cb) {
		Request.get(url, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				cb('Error while fetching ' + url + ': ' + response.statusCode);
			} else {
				cb(null, body);
			}
		});
	};
};



/**
 *	Prepares the given URL before fetching informations from it.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype._prepareUrl = function(url, options) {
	return url.trim();
};



/**
 *	Completes the given informations.
 *
 *	@param {object} infos - Informations.
 *	@param {object} options - Options.
 */
Service.prototype._completeInfos = function(infos, options) {
	return infos;
};



/**
 *	Reindexes the given informations.
 *
 *	@param {object} infos - The informations to be reindexed.
 *	@param {object} map - A map like {'oldIndex': 'newIndex'}.
 *	@return {object} - Reindexed informations.
 */
Service.prototype._reindexInfos = function(infos) {
	if (this._options.map) {
		_.each(this._options.map, function(to, from) {
			if (from in infos) {
				infos[to] = infos[from];
			}
		});
	}

	return infos;
};



module.exports = Service;
