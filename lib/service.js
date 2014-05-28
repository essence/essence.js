/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');



/**
 *	A service providing embed informations.
 */
var Service = function() {}



/**
 *	Fetches informations from the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype.fetch = function(url, options) {
	options = options || {};

	var url = this.prepareUrl(url, options);
	var promise = this._fetch(url, options);

	return promise.then((function(media) {
		media.url = media.url || url;
		return this.completeMedia(media, options);
	}).bind(this));
};



/**
 *	Actually fetches informations.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype._fetch = function(url, options) {
	return Q.reject('Not implemented.');
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



module.exports = Service
