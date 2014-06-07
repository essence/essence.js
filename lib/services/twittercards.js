/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');
var Service = require('../service');



/**
 *	Constructor.
 *
 *	@see Service
 */
var OpenGraph = function(options) {
	Service.call(this, _.merge({
		map: {
			'og:type': 'type',
			'og:title': 'title',
			'og:description': 'description',
			'og:site_name': 'providerName',
			'og:image': 'thumbnailUrl',
			'og:image:url': 'thumbnailUrl',
			'og:image:width': 'width',
			'og:image:height': 'height',
			'og:video:width': 'width',
			'og:video:height': 'height',
			'og:url': 'url'
		}
	}, options));
};



/**
 *	Subclassing.
 */
OpenGraph.prototype = new Service();
OpenGraph.prototype.constructor = OpenGraph;



/**
 *	@see Service#_fetch
 */
OpenGraph.prototype._fetch = function *(url, options) {
	var page = yield this._get(url);
	return this._extractProperties(page);
};



/**
 *	Extracts OpenGraph properties from the given HTML string.
 *
 *	@param {string} html HTML.
 *	@returns {object} OpenGraph properties.
 */
OpenGraph.prototype._extractProperties = function(html) {
	var $ = cheerio.load(html);
	var metas = $('meta', 'head');
	var props = {};

	metas.each(function(i, meta) {
		var name = $(meta).attr('property');

		if (name && name.match(/^og:/i)) {
			props[name] = $(meta).attr('content');
		}
	});

	if (_.isEmpty(props)) {
		throw new Error('Unable to extract OpenGraph properties');
	}

	return props;
};



module.exports = OpenGraph;
