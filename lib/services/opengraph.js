/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var co = require('co');
var Cheerio = require('cheerio');
var Service = require('../service');



/**
 *	Constructor.
 *
 *	@param {object} map - Properties mapping.
 */
var OpenGraph = function(map) {
	this._map = _(map || {}).defaults({
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
	});
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
	var props = this._extractProperties(page);

	return this._reindexProperties(props);
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



/**
 *	Extracts OpenGraph properties from the given HTML string.
 *
 *	@param {object} props - OpenGraph properties.
 *	@return {object} - Reindexed OpenGraph properties.
 */
OpenGraph.prototype._reindexProperties = function(props) {
	_(this._map).each(function(to, from) {
		if (from in props) {
			props[to] = props[from];
		}
	}, this);

	return props;
};



module.exports = OpenGraph;
