/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var OEmbed = require('./oembed');



/**
 *	{@inheritDoc}
 */
var Youtube = function(endpoint, format) {
	OEmbed.call(this, endpoint, format);
};



/**
 *	Subclassing.
 */
Youtube.prototype = new OEmbed();
Youtube.prototype.constructor = Youtube;



/**
 *	{@inheritDoc}
 */
Youtube.prototype.prepareUrl = function(url, options) {
	url = url.trim();
	var matches = /(?:v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)/i.exec(url);

	if (matches && matches[1]) {
		url = 'http://www.youtube.com/watch?v=' + matches[1];
	}

	return url;
};



module.exports = Youtube;
