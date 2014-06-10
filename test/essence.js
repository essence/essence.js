/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Essence = require('../lib/essence');
var Provider = require('../lib/provider');



/**
 *
 */
describe('Essence', function() {
	var provider = new Provider();

	provider._extract = function *() {
		return {};
	};

	var config = [{
		name: 'Test',
		scheme: /url/i,
		provider: function() {
			return provider;
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

	describe('#extract', function() {
		it('should return an error when no provider is found', function(done) {
			essence.extract('', function(error, infos) {
				should.exist(error);
				done();
			});
		});

		it('should use a suitable provider', function(done) {
			essence.extract('url', done);
		});

		it('should return a thunk', function(done) {
			essence.extract('url')(done);
		});
	});

	describe('#_providersFor', function() {
		it('should yield providers', function() {
			var providers = essence._providersFor('url');
			providers.next().value.should.equal(provider);
		});
	});

	describe('#_provider', function() {
		it('should instanciate a provider', function() {
			essence._provider(config[0]).should.equal(provider);
		});
	});
});
