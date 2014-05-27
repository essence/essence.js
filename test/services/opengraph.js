/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');
var should = require('should');
var Service = require('../lib/service');
var OpenGraph = require('../lib/services/opengraph');



/**
 *
 */
describe('OpenGraph', function() {
	var openGraph = null;

	beforeEach(function() {
		if (openGraph) {
			delete openGraph;
		}

		openGraph = new OpenGraph();
	});

	it('should extend Service', function(done) {
		opengraph.should.be.an.instanceOf(Service);
	});
});
