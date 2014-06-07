/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var OpenGraph = require('../opengraph');



/**
 *	Constructor.
 *
 *	@see OpenGraph.
 */
var Vine = function(options) {
	OpenGraph.call(this, _.merge({
		complete: {
			templates: {
				'vine-app:video':
					'<iframe src="https://vine.co/v/<%- id %>/embed/postcard"></iframe>'
					+ '<script async src="//platform.vine.co/static/scripts/embed.js"></script>'
			}
		}
	}, options));
};



/**
 *	Subclassing.
 */
Vine.prototype = new OpenGraph();
Vine.prototype.constructor = Vine;



/**
 *	@see OpenGraph#_completeInfos.
 */
Vine.prototype._completeInfos = function(infos, options) {
	var matches = /vine\.co\/v\/([a-z0-9]+)/i.exec(infos.url);

	if (matches && matches[1]) {
		infos.id = matches[1];
	}

	return OpenGraph.prototype._completeInfos.call(this, infos, options);
};



module.exports = Vine;
