/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var request = require('request');
var htmlparser = require('htmlparser2');
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
	request();
};



/**
 *
 */
OpenGraph.prototype._extractMetas = function() {
	var metas = {};
	var parser = htmlparser.Parser({
		onopentag: function(name, attributes) {
			if (name === 'meta') {
				metas[name] = attributes.content;
			}
		},
		onend: function() {

		}
	});

	parser.end();
};



module.exports = OpenGraph;
