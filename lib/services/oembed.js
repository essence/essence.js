/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');
var Request = require('request');
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
	var dfd = Q.defer();
	var config = this._config();

	Request.get(config.url, function(error, response, body) {
		if (error || response.statusCode !== 200) {
			dfd.reject('Error while fetching ' + url + ': ' + response.statusCode);
			return;
		}

		switch (config.format) {
			case 'json':
				this._parseJson(dfd, body);
				break;

			case 'xml':
				this._parseXml(dfd, body);
				break;

			default:
				dfd.reject('Unsupported response format');
				break;
		}
	});

	return dfd.promise;
};



/**
 *
 *
 *	 @return {object} - Configuration.
 */
OEmbed.prototype._config = function() {
	var config = this._endpoint
		? this._buildConfig(url)
		: this._extractConfig(url);

	if (config.length === 0) {
		dfd.reject('Unable to extract any endpoint from ' + url);
		return;
	}

	if (options) {
		config.url = this._completeUrl(config.url, options);
	}

	return config;
};



/**
 *	Builds a configuration from the endpoint scheme.
 *
 *	@return {object} - Configuration.
 */
OEmbed.prototype._buildConfig = function(url) {
	return {
		url: sprintf(this._endpoint, urlencode(url)),
		format: this._format
	};
};



/**
 *	Searches for an OEmbed meta tag in the given page and returns its endpoint
 *	and format.
 *
 *	@param {string} url - URL of the page to parse.
 *	@return {object} - Configuration.
 */
OEmbed.prototype._extractConfig = function(url) {
	return {};
};



/**
 *	Parses the given JSON string.
 *
 *	@param
 *	@param {string} json - JSON string.
 */
OEmbed.prototype._parseJson = function(dfd, json) {
	try {
		dfd.resolve(JSON.parse(json));
	} catch (e) {
		dfd.reject('Error parsing JSON: ' + e);
	}
};



/**
 *	Parses the given XML string.
 *
 *	@param
 *	@param {string} xml - XML string.
 */
OEmbed.prototype._parseXml = function(dfd, xml) {
	Digester.digest(xml, function(error, data) {
		if (error) {
			dfd.reject('Error parsing XML');
		} else {
			dfd.resolve(data.oembed);
		}
	});
};



module.exports = OEmbed;
