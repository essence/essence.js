/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Essence = require('../lib/essence');
var Service = require('../lib/service');



/**
 *
 */
describe('Essence', function() {
	var service = new Service();

	service._fetch = function() {
		return co(function *() {
			return {};
		});
	};

	var config = [{
		name: 'Test',
		scheme: /url/i,
		service: function() {
			return service;
		}
	}];

	var essence = null;

	beforeEach(function() {
		essence = new Essence(config);
	});

	describe('#constructor', function() {
		it('should be configurable', function() {
			essence._config.should.equal(config);
		});
	});

	describe('#fetch', function() {
		it('should return an error when no service is found', function(done) {
			essence.fetch('', function(error, media) {
				if (error) {
					done();
				}
			});
		});

		it('should use a suitable service', function(done) {
			essence.fetch('url', function(error, media) {
				if (!error) {
					done();
				}
			});
		});
	});

	describe('#_service', function() {
		it('should instanciate a service', function() {
			essence._service(config[0]).should.equal(service);
		});
	});
});
