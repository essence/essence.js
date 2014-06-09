/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var request = require('request');



/**
 *	A provider providing embed informations.
 *
 *	@param {object} options Options:
 *		- {object} map Map to reindex informations after extracting
 *		- {object} complete Default options for _completeInfos():
 *			- {object} defaults Default values to complete informations
 *			- {object} templates Templates to fill the 'html' property
 */
var Provider = function(options) {
	this._options = _.merge({
		reindex: {},
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
 *	@param {string} url URL.
 *	@param {object} options Options.
 *	@returns {object} Informations.
 */
Provider.prototype.extract = function *(url, options) {
	url = this._prepareUrl(url, options);

	var infos = yield this._extract(url, options);
	infos.url || (infos.url = url);

	return this._completeInfos(
		this._reindexInfos(infos, this._options.reindex),
		options
	);
};



/**
 *	Actually extracts informations.
 *
 *	@param {string} url URL.
 *	@param {object} options Options.
 */
Provider.prototype._extract = function *(url, options) {
	throw new Error('Not implemented.');
};



/**
 *	Fetches and returns the contents of the page at the given URL.
 *
 *	@param {string} url URL.
 *	@returns {function} Thunk.
 */
Provider.prototype._get = function(url) {
	return function(cb) {
		request(url, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				cb('Error while extracting ' + url + ': ' + response.statusCode);
			} else {
				cb(null, body);
			}
		});
	};
};



/**
 *	Prepares the given URL before extracting informations from it.
 *
 *	@param {string} url URL.
 *	@param {object} options Options.
 *	@returns {string} Prepared URL.
 */
Provider.prototype._prepareUrl = function(url, options) {
	return url.trim();
};



/**
 *	Completes the given informations.
 *
 *	@param {object} infos Informations.
 *	@param {object} options Options.
 *	@returns {object} Completed informations.
 */
Provider.prototype._completeInfos = function(infos, options) {
	var opts = _.merge({}, this._options.complete, options.complete || {});
	_.defaults(infos, opts.defaults);

	if (!infos.html) {
		var vars = _.clone(infos);
		vars.title || (vars.title = vars.url);
		vars.description || (vars.description = vars.title);

		var type = (vars.type in opts.templates) ? vars.type : 'default';
		var template = _.template(opts.templates[type]);
		infos.html = template(vars);
	}

	return infos;
};



/**
 *	Reindexes the given informations.
 *
 *	@param {object} infos The informations to be reindexed.
 *	@param {object} map A map like {'oldIndex': 'newIndex'}.
 *	@returns {object} Reindexed informations.
 */
Provider.prototype._reindexInfos = function(infos, map) {
	_.each(map, function(to, from) {
		if (from in infos) {
			infos[to] = infos[from];
		}
	});

	return infos;
};



module.exports = Provider;
