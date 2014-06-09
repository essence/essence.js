/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var util = require('util');
var MetaTags = require('../metatags');



/**
 *	Constructor.
 *
 *	@see MetaTags
 */
var OpenGraph = function(options) {
	MetaTags.call(this, _.merge({
		scheme: /^og:/i,
		reindex: {
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

util.inherits(OpenGraph, MetaTags);



module.exports = OpenGraph;
