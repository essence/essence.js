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
		service = new Service();
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

		it('should complete the media', function(done) {
			service._fetch = function(url, options) {
				return co(function *() {
					return {};
				});
			};

			service.completeMedia = function(media, options) {
				done();
			};

			co(function *() {
				yield service.fetch('');
			})();
		});
	});

	describe('#prepareUrl', function() {
		it('should trim the URL', function() {
			service.prepareUrl(' url ').should.equal('url');
		});
	});

	describe('#completeMedia', function() {
		it('should return the media as is', function() {
			var media = { url: 'url' };
			var completed = service.completeMedia(media);

			completed.should.equal(media);
		});
	});
});
