/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var should = require('should');
var Service = require('../../lib/service');
var Bandcamp = require('../../lib/services/bandcamp');



/**
 *
 */
describe('Bandcamp', function() {
	var bandcamp = null;

	beforeEach(function() {
		bandcamp = new Bandcamp();
	});

	it('should extend Service', function() {
		bandcamp.should.be.an.instanceOf(Service);
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
