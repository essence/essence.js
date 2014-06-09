/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var util = require('util');
var OEmbed = require('../oembed');



/**
 *	Constructor.
 *
 *	@see OEmbed.
 */
var Vimeo = function(options) {
	OEmbed.call(this, options);
};

util.inherits(Vimeo, OEmbed);



/**
 *	Refactors the given URL into one understandable by Vimeo's OEmbed API.
 *
 *	@see OEmbed#_prepareUrl.
 */
Vimeo.prototype._prepareUrl = function(url, options) {
	url = OEmbed.prototype._prepareUrl.call(this, url, options);
	var matches = /player\.vimeo\.com\/video\/([0-9]+)/i.exec(url);

	if (matches && matches[1]) {
		url = 'http://www.vimeo.com/' + matches[1];
	}

	return url;
};



module.exports = Vimeo;
