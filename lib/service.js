/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var util = require('util');
var request = require('request');



/**
 *	A service providing embed informations.
 *
 *	@param {object} options Options:
 *		- {object} map Map to reindex informations after fetching
 */
var Service = function(options) {
	this._options = _.extend({
		map: {},
		complete: {
			defaults: {
				width: 800,
				height: 600
			},
			templates: {
				'photo': '<img src="<%- url %>" alt="<%- description %>" width="<%- width %>" height="<%- height %>" />',
				'video': '<iframe src="<%- url %>" width="<%- width %>" height="<%- height %>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />',
				'default': '<a href="<%- url %>" alt="<%- description %>"><%- title %></a>'
			}
		}
	}, options);
};



/**
 *	Fetches informations from the given URL.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype.fetch = function *(url, options) {
	url = this._prepareUrl(url, options);

	var infos = yield this._fetch(url, options);
	infos.url || (infos.url = url);

	return this._completeInfos(
		this._reindexInfos(infos),
		options
	);
};



/**
 *	Actually fetches informations.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype._fetch = function *(url, options) {
	throw new Error('Not implemented.');
};



/**
 *	Fetches and returns the contents of the page at the given URL.
 *
 *	@param {string} url - URL.
 *	@param {string} - Contents.
 */
Service.prototype._get = function(url) {
	return function(cb) {
		request(url, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				cb('Error while fetching ' + url + ': ' + response.statusCode);
			} else {
				cb(null, body);
			}
		});
	};
};



/**
 *	Prepares the given URL before fetching informations from it.
 *
 *	@param {string} url - URL.
 *	@param {object} options - Options.
 */
Service.prototype._prepareUrl = function(url, options) {
	return url.trim();
};



/**
 *	Completes the given informations.
 *
 *	@param {object} infos - Informations.
 *	@param {object} options - Options.
 */
Service.prototype._completeInfos = function(infos, options) {
	if (!infos.html) {
		var opts = _.defaults({}, options.complete || {}, this._options.complete);
		var vars = _.clone(infos);

		vars.title || (vars.title = vars.url);
		vars.description || (vars.description = vars.title);
		vars.width || (vars.width = opts.defaults.width);
		vars.height || (vars.height = opts.defaults.height);

		var type = (vars.type in opts.templates) ? vars.type : 'default';
		var template = _.template(opts.templates[type]);

		infos.html = template(vars);
	}

	return infos;
};



/**
 *	Reindexes the given informations.
 *
 *	@param {object} infos - The informations to be reindexed.
 *	@param {object} map - A map like {'oldIndex': 'newIndex'}.
 *	@return {object} - Reindexed informations.
 */
Service.prototype._reindexInfos = function(infos) {
	if (this._options.map) {
		_.each(this._options.map, function(to, from) {
			if (from in infos) {
				infos[to] = infos[from];
			}
		});
	}

	return infos;
};



module.exports = Service;
