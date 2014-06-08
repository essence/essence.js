/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var nock = require('nock');
var should = require('should');
var Service = require('../lib/service');



/**
 *
 */
describe('Service', function() {
	var service = null;

	beforeEach(function() {
		service = new Service({
			reindex: {
				'old': 'new'
			}
		});
	});

	describe('#extract', function() {
		it('should fail by default', function(done) {
			co(function *() {
				try {
					yield service.extract('');
				} catch (e) {
					done();
				}
			})();
		});

		it('should prepare the URL', function(done) {
			service._prepareUrl = function(url, options) {
				done();
			};

			co(function *() {
				try {
					yield service.extract('');
				} catch (e) {}
			})();
		});

		it('should complete the informations', function(done) {
			service._extract = function *(url, options) {
				return {};
			};

			service._completeInfos = function(infos, options) {
				done();
			};

			co(function *() {
				yield service.extract('');
			})();
		});

		it('should reindex the informations', function(done) {
			service._extract = function *(url, options) {
				return {};
			};

			service._reindexInfos = function(infos, options) {
				done();
			};

			co(function *() {
				try {
					yield service.extract('');
				} catch (e) {}
			})();
		});
	});

	describe('#_get', function() {
		var url = 'http://service.com';
		var html = '<html></html>';

		it('should fetch contents of a page', function(done) {
			nock(url).get('/').reply(200, html);

			co(function *() {
				var contents = yield service._get(url);

				contents.should.equal(html);
				done();
			})();
		});

		it('should throw an error if no contents can be retrieved', function(done) {
			nock(url).get('/').reply(404);

			co(function *() {
				try {
					yield service._get(url);
				} catch (e) {
					done();
				}
			})();
		});
	});

	describe('#_prepareUrl', function() {
		it('should trim the URL', function() {
			service._prepareUrl(' url ').should.equal('url');
		});
	});

	describe('#_completeInfos', function() {
		it('should build an HTML code for photos', function() {
			var infos = service._completeInfos({
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
			var infos = service._completeInfos({
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
			var infos = service._completeInfos({
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
			var infos = service._reindexInfos({'old' : 'foo'});

			infos.should.have.property('new', 'foo');
		});
	});
});
