/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var nock = require('nock');
var should = require('should');
var Provider = require('../lib/provider');



/**
 *
 */
describe('Provider', function() {
	var provider = null;

	beforeEach(function() {
		provider = new Provider();
	});

	describe('#extract', function() {
		it('should fail by default', function(done) {
			co(function *() {
				try {
					yield provider.extract('');
				} catch (e) {
					done();
				}
			})();
		});

		it('should prepare the URL', function(done) {
			provider._prepareUrl = function(url, options) {
				done();
			};

			co(function *() {
				try {
					yield provider.extract('');
				} catch (e) {}
			})();
		});

		it('should complete the informations', function(done) {
			provider._extract = function *(url, options) {
				return {};
			};

			provider._completeInfos = function(infos, options) {
				done();
			};

			co(function *() {
				yield provider.extract('');
			})();
		});

		it('should reindex the informations', function(done) {
			provider._extract = function *(url, options) {
				return {};
			};

			provider._reindexInfos = function(infos, map) {
				done();
			};

			co(function *() {
				try {
					yield provider.extract('');
				} catch (e) {}
			})();
		});
	});

	describe('#_get', function() {
		var url = 'http://provider.com';
		var html = '<html></html>';

		it('should fetch contents of a page', function(done) {
			nock(url).get('/').reply(200, html);

			co(function *() {
				var contents = yield provider._get(url);

				contents.should.equal(html);
				done();
			})();
		});

		it('should throw an error if no contents can be retrieved', function(done) {
			nock(url).get('/').reply(404);

			co(function *() {
				try {
					yield provider._get(url);
				} catch (e) {
					done();
				}
			})();
		});
	});

	describe('#_prepareUrl', function() {
		it('should trim the URL', function() {
			provider._prepareUrl(' url ').should.equal('url');
		});
	});

	describe('#_completeInfos', function() {
		it('should build an HTML code for photos', function() {
			var infos = provider._completeInfos({
				type: 'photo',
				url: 'url',
				title: 'title',
				description: 'description',
				width: 800,
				height: 600
			}, {});

			infos.html.should.equal(
				'<img src="url" alt="description" width="800" height="600" />'
			);
		});

		it('should build an HTML code for videos', function() {
			var infos = provider._completeInfos({
				type: 'video',
				url: 'url',
				title: 'title',
				description: 'description',
				width: 800,
				height: 600
			}, {});

			infos.html.should.equal(
				'<iframe src="url" width="800" height="600" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />'
			);
		});

		it('should build an HTML code for unhandled types', function() {
			var infos = provider._completeInfos({
				url: 'url',
				title: 'title',
				description: 'description'
			}, {});

			infos.html.should.equal(
				'<a href="url" alt="description">title</a>'
			);
		});
	});

	describe('#_reindexInfos', function() {
		it('should reindex the informations', function() {
			var infos = provider._reindexInfos(
				{'old': 'foo'},
				{'old': 'new'}
			);

			infos.should.have.property('new', 'foo');
		});
	});
});
