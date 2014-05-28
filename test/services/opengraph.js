/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var Q = require('q');
var should = require('should');
var Service = require('../../lib/service');
var OpenGraph = require('../../lib/services/opengraph');



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

	it('should extend Service', function() {
		openGraph.should.be.an.instanceOf(Service);
	});

	it('should try a thing', function() {
		var props = openGraph._extractProperties(
			'<html>'
				+ '<head>'
					+ '<meta name="og:title" content="Title" />'
				+ '</head>'
			+ '</html>'
		);

		props.should.equal({
			'og:title': 'Title'
		});
	});
});
