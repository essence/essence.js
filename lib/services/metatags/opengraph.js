/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var cheerio = require('cheerio');
var MetaTags = require('../metatags');



/**
 *	Constructor.
 *
 *	@see MetaTags
 */
var OpenGraph = function(options) {
	MetaTags.call(this, _.merge({
		scheme: /^og:/i,
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
OpenGraph.prototype = new MetaTags();
OpenGraph.prototype.constructor = OpenGraph;



module.exports = OpenGraph;
