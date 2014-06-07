/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var should = require('should');
var OpenGraph = require('../../../../lib/services/metatags/opengraph');
var Bandcamp = require('../../../../lib/services/metatags/opengraph/bandcamp');



/**
 *
 */
describe('Bandcamp', function() {
	var bandcamp = null;

	beforeEach(function() {
		bandcamp = new Bandcamp();
	});

	it('should extend OpenGraph', function() {
		bandcamp.should.be.an.instanceOf(OpenGraph);
	});

	describe('#_completeInfos', function() {
		it('should fill the `html` property', function() {
			var infos = bandcamp._completeInfos({
				'url': '',
				'twitter:player': ''
			}, {});
		});
	});
});