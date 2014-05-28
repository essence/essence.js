/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Request = require('request');
var Cheerio = require('cheerio');
var Service = require('../service');



/**
 *
 */
var OpenGraph = function() {};



/**
 *	Subclassing.
 */
OpenGraph.prototype = new Service();
OpenGraph.prototype.constructor = OpenGraph;



/**
 *
 */
OpenGraph.prototype._fetch = function() {

};



/**
 *
 */
OpenGraph.prototype._fetchPage = function(url) {
	Request();
};



/**
 *
 */
OpenGraph.prototype._extractProperties = function(html) {
	var $ = Cheerio.load(html);
	var metas = $('meta', 'head');
	var props = {};

	for (i in metas) {
		var attrs = metas[i].attribs;

		if (
			attrs.content
			&& attrs.name
			&& attrs.name.match(/^og:/i)
		) {
			props[attrs.name] = attrs.content;
		}
	}

	return props;
};



module.exports = OpenGraph;
