/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var Request = require('request');



/**
 *	A service providing embed informations.
 */
var Service = function() {};



/**
 *	Fetches informations from the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype.fetch = function *(url, options) {
	options = options || {};
	url = this.prepareUrl(url, options);

	var media = yield this._fetch(url, options);
	media.url = media.url || url;

	return this.completeMedia(media, options);
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
 *	Completes the informations of the given Media.
 *
 *	@param {object} media - Media.
 *	@param {object} options - Options.
 */
Service.prototype.completeMedia = function(media, options) {
	return media;
};



module.exports = Service;
