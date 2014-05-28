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

		it('should use the default config if none is provided', function() {
			var defaultConfig = require('../lib/config');

			(new Essence())._config.should.equal(defaultConfig);
		});
	});

	describe('#fetch', function() {
		it('should use a suitable service', function(done) {
			essence.fetch('url').then(function() {
				done();
			});
		});
	});
});
