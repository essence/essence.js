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

	describe('#_extractProperties', function() {
		it('should extract OpenGraph properties', function() {
			var props = openGraph._extractProperties(
				'<html>'
					+ '<head>'
						+ '<meta name="og:title" content="Title" />'
						+ '<meta name="irrelevant" content="Irrelevant" />'
					+ '</head>'
				+ '</html>'
			);

			props.should.eql({
				'og:title': 'Title'
			});
		});
	});
});
