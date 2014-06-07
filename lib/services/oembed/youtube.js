/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var OEmbed = require('../oembed');



/**
 *	Constructor.
 *
 *	@see OEmbed.
 */
var Youtube = function(options) {
	OEmbed.call(this, options);
};



/**
 *	Subclassing.
 */
Youtube.prototype = new OEmbed();
Youtube.prototype.constructor = Youtube;



/**
 *	Refactors the given URL into one understandable by Youtube's OEmbed API.
 *
 *	@see OEmbed#_prepareUrl.
 */
Youtube.prototype._prepareUrl = function(url, options) {
	url = url.trim();
	var matches = /(?:v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)/i.exec(url);

	if (matches && matches[1]) {
		url = 'http://www.youtube.com/watch?v=' + matches[1];
	}

	return url;
};



module.exports = Youtube;
