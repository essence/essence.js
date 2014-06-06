/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var OpenGraph = require('./opengraph');



/**
 *	Constructor.
 *
 *	@see OpenGraph.
 */
var Bandcamp = function(options) {
	OpenGraph.call(this, options);
};



/**
 *	Subclassing.
 */
Bandcamp.prototype = new OpenGraph();
Bandcamp.prototype.constructor = Bandcamp;



/**
 *	@see OpenGraph#_completeInfos.
 */
Bandcamp.prototype._completeInfos = function(infos, options) {
	infos = OpenGraph.prototype._completeInfos.call(this, infos, options);

	if (!infos.html) {
		infos.html = infos['twitter:player'];
	}

	return infos;
};



module.exports = Bandcamp;
