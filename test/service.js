/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Service = require('../lib/service');



/**
 *
 */
describe('Service', function() {
	var service = null;

	beforeEach(function() {
		service = new Service({
			map: {
				'old': 'new'
			}
		});
	});

	describe('#fetch', function() {
		it('should fail by default', function(done) {
			co(function *() {
				try {
					yield service.fetch('');
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
					yield service.fetch('');
				} catch (e) {}
			})();
		});

		it('should complete the informations', function(done) {
			service._fetch = function *(url, options) {
				return {};
			};

			service._completeInfos = function(infos, options) {
				done();
			};

			co(function *() {
				yield service.fetch('');
			})();
		});

		it('should reindex the informations', function(done) {
			service._fetch = function *(url, options) {
				return {};
			};

			service._reindexInfos = function(infos, options) {
				done();
				return {};
			};

			service._completeInfos = function(infos, options) {
				return {};
			};

			co(function *() {
				yield service.fetch('');
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
