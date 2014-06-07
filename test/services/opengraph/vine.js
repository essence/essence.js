/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var should = require('should');
var OpenGraph = require('../../../lib/services/opengraph');
var Vine = require('../../../lib/services/opengraph/vine');



/**
 *
 */
describe('Vine', function() {
	var vine = null;

	beforeEach(function() {
		vine = new Vine();
	});

	it('should extend OpenGraph', function() {
		vine.should.be.an.instanceOf(OpenGraph);
	});

	describe('#_completeInfos', function() {
		it('should fill the `html` property', function() {
			var infos = vine._completeInfos({
				url: 'http://vine.co/v/a1b2c3',
				type: 'vine-app:video'
			}, {});

			infos.should.have.property(
				'html',
				'<iframe src="https://vine.co/v/a1b2c3/embed/postcard"></iframe>'
					+ '<script async src="//platform.vine.co/static/scripts/embed.js"></script>'
			);
		});
	});
});
