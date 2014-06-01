/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');
var should = require('should');
var Essence = require('../lib/essence');
var Service = require('../lib/service');



/**
 *
 */
describe('Essence', function() {
	var service = new Service();

	service._fetch = function() {
		return Q.Promise(function(resolve) {
			resolve({});
		});
	};

	var config = [{
		name: 'Test',
		scheme: /url/i,
		service: function() {
			return service;
		}
	}];

	var essence = new Essence(config);

	describe('#constructor', function() {
		it('should be configurable', function() {
			essence._config.should.equal(config);
		});
	});

	describe('#fetch', function() {
		it('should use a suitable service', function(done) {
			essence.fetch('url').then(function() {
				done();
			});
		});
	});

	describe('#_service', function() {
		it('should instanciate a service', function() {
			essence._service(config[0]).should.equal(service);
		});
	});
});
