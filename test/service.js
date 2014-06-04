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
			service.prepareUrl = function(url, options) {
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

			service.completeInfos = function(infos, options) {
				done();
			};

			co(function *() {
				yield service.fetch('');
			})();
		});

		it('should reindex the informations', function(done) {
			service._fetch = function *(url, options) {
				return {
					'old': 'foo'
				};
			};

			co(function *() {
				var infos = yield service.fetch('');

				infos.should.have.property('new', 'foo');
				done();
			})();
		});
	});

	describe('#prepareUrl', function() {
		it('should trim the URL', function() {
			service.prepareUrl(' url ').should.equal('url');
		});
	});

	describe('#completeInfos', function() {
		it('should return the informations as is', function() {
			var infos = { url: 'url' };
			var completed = service.completeInfos(infos);

			completed.should.equal(infos);
		});
	});
});
