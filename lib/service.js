/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var Request = require('request');
var reindex = require('./utils').reindex;



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
	url = this.prepareUrl(url, options);

	var infos = yield this._fetch(url, options);
	infos.url = infos.url || url;

	if (this._options.map) {
		infos = reindex(infos, this._options.map);
	}

	return this.completeInfos(infos, options);
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
Service.prototype.prepareUrl = function(url, options) {
	return url.trim();
};



/**
 *	Completes the given informations.
 *
 *	@param {object} infos - Informations.
 *	@param {object} options - Options.
 */
Service.prototype.completeInfos = function(infos, options) {
	return infos;
};



module.exports = Service;
