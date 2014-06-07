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
var MetaTags = function(options) {
	Service.call(this, _.merge({
		scheme: /.+/i
	}, options));
};



/**
 *	Subclassing.
 */
MetaTags.prototype = new Service();
MetaTags.prototype.constructor = MetaTags;



/**
 *	@see Service#_extract
 */
MetaTags.prototype._extract = function *(url, options) {
	return this._extractProperties(
		yield this._get(url)
	);
};



/**
 *	Extracts meta properties from the given HTML string.
 *
 *	@param {string} html HTML.
 *	@returns {object} Meta properties.
 */
MetaTags.prototype._extractProperties = function(html) {
	var $ = cheerio.load(html);
	var metas = $('meta', 'head');
	var scheme = this._options.scheme;
	var props = {};

	metas.each(function(i, meta) {
		var name = $(meta).attr('property');

		if (name && name.match(scheme)) {
			props[name] = $(meta).attr('content');
		}
	}, this);

	if (_.isEmpty(props)) {
		throw new Error('Unable to extract MetaTags properties');
	}

	return props;
};



module.exports = MetaTags;
