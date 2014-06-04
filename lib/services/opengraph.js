/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var Cheerio = require('cheerio');
var Service = require('../service');



/**
 *	Constructor.
 *
 *	@param {object} map - Properties mapping.
 */
var OpenGraph = function(options) {
	Service.call(this, _.extend({
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
 *	{@inheritDoc}
 */
OpenGraph.prototype._fetch = function *(url, options) {
	var page = yield this._get(url);
	return this._extractProperties(page);
};



/**
 *	Extracts OpenGraph properties from the given HTML string.
 *
 *	@param {string} html - HTML.
 *	@return {object} - OpenGraph properties.
 */
OpenGraph.prototype._extractProperties = function(html) {
	var $ = Cheerio.load(html);
	var metas = $('meta', 'head');
	var props = {};

	metas.each(function(i, meta) {
		var name = $(meta).attr('name');

		if (name && name.match(/^og:/i)) {
			props[name] = $(meta).attr('content');
		}
	});

	return props;
};



module.exports = OpenGraph;
