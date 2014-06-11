/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var util = require('util');
var Presenter = require('../presenter');



/**
 *	{@inheritDoc}
 */
var Templater = function(templates) {
	this._templates = _.merge({
		'photo': '<img src="<%- url %>" alt="<%- description %>" width="<%- width %>" height="<%- height %>" />',
		'video': '<iframe src="<%- url %>" width="<%- width %>" height="<%- height %>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />',
		'default': '<a href="<%- url %>" alt="<%- description %>"><%- title %></a>'
	}, templates || {});
};

util.inherits(Templater, Presenter);



/**
 *	{@inheritDoc}
 */
Templater.prototype.apply = function(infos) {
	if (!infos.html) {
		var vars = _.clone(infos);
		vars.title || (vars.title = vars.url);
		vars.description || (vars.description = vars.title);

		var type = (vars.type in this._templates) ? vars.type : 'default';
		var template = _.template(this._templates[type]);
		infos.html = template(vars);
	}

	return infos;
};



module.exports = Templater;
