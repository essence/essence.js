/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');
var should = require('should');
var Service = require('../lib/service');



/**
 *
 */
describe('Service', function() {
	var service = null;

	beforeEach(function() {
		if (service) {
			delete service;
		}

		service = new Service();
	});

	describe('#fetch', function() {
		it('should fail by default', function(done) {
			service.fetch('').fail(function() {
				done();
			});
		});

		it('should prepare the URL', function(done) {
			service.prepareUrl = function() {
				done();
			};

			service.fetch('');
		});

		it('should complete the media', function(done) {
			service._fetch = function() {
				return Q.Promise(function(resolve) {
					resolve({});
				});
			};

			service.completeMedia = function() {
				done();
			}

			service.fetch('');
		});
	});

	describe('#prepareUrl', function() {
		it('should trim the URL', function() {
			var url = ' url ';
			var prepared = service.prepareUrl(url);

			prepared.should.equal('url');
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
