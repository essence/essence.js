/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var co = require('co');
var Cheerio = require('cheerio');
var Digester = require('xml-digester').XmlDigester({});
var Service = require('../service');



/**
 *	Constructor.
 *
 *	@param {string} endpoint - OEmbed endpoint.
 *	@param {string} - Response format.
 */
var OEmbed = function(endpoint, format) {
	this._endpoint = endpoint || '';
	this._format = format || 'json';
};



/**
 *	Subclassing.
 */
OEmbed.prototype = new Service();
OEmbed.prototype.constructor = OEmbed;



/**
 *	{@inheritDoc}
 */
OEmbed.prototype._fetch = function(url, options) {
	return co(function *() {
		var config = yield this._config(url, options);
		var page = yield this._get(config.endpoint);
		var media = {};

		switch (config.format) {
			case 'json': media = yield this._parseJson(body);
			case 'xml': media = yield this._parseXml(body);
			default:
				throw new Error('Unsupported response format');
		}

		return media;
	}).bind(this);
};



/**
 *
 *
 *	 @return {object} - Configuration.
 */
OEmbed.prototype._config = function(url, options) {
	return co(function *() {
		var config = this._endpoint
			? this._buildConfig(url)
			: this._parseMetas(yield this._get(url));

		if (config.length === 0) {
			throw new Error('Unable to extract any endpoint from ' + url);
		}

		if (options) {
			config.endpoint = this._completeEndpoint(config.endpoint, options);
		}

		return config;
	}).bind(this);
};



/**
 *	Builds a configuration from the configured endpoint scheme and format.
 *
 *	@param {string} url - Media URL.
 *	@return {object} - Configuration.
 */
OEmbed.prototype._buildConfig = function(url) {
	return {
		endpoint: sprintf(this._endpoint, urlencode(url)),
		format: this._format
	};
};



/**
 *	Searches for an OEmbed meta tag in the given HTML string and returns its
 *	endpoint and format.
 *
 *	@param {string} html - HTML.
 *	@return {object} - Configuration.
 */
OEmbed.prototype._extractConfig = function(html) {
	var $ = Cheerio.load(html);
	var links = $('link', 'head');
	var config = {};

	links.each(function(i, link) {
		var type = $(link).attr('type');
		var href = $(link).attr('href');

		if (type && href) {
			var matches = /application\/(json|xml)\+oembed/i.exec(type);

			if (matches[1]) {
				config.endpoint = href;
				config.format = matches[1];
				return false;
			}
		}
	});

	return config;
};



/**
 *	Parses the given JSON string.
 *
 *	@param
 *	@param {string} json - JSON string.
 */
OEmbed.prototype._completeEndpoint = function(endpoint, options) {
	return endpoint;
};



/**
 *	Parses the given JSON string.
 *
 *	@param
 *	@param {string} json - JSON string.
 */
OEmbed.prototype._parseJson = function(dfd, json) {
	return function(cb) {
		try {
			cb(null, JSON.parse(json));
		} catch (e) {
			cb('Error parsing JSON: ' + e);
		}
	}
};



/**
 *	Parses the given XML string.
 *
 *	@param
 *	@param {string} xml - XML string.
 */
OEmbed.prototype._parseXml = function(dfd, xml) {
	return function(cb) {
		Digester.digest(xml, function(error, data) {
			if (error) {
				cb('Error parsing XML');
			} else {
				cb(null, data.oembed);
			}
		});
	}
};



module.exports = OEmbed;
