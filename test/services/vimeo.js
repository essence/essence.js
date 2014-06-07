/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var should = require('should');
var OEmbed = require('../../lib/services/oembed');
var Vimeo = require('../../lib/services/vimeo');



/**
 *
 */
describe('Vimeo', function() {
	var vimeo = null;

	beforeEach(function() {
		vimeo = new Vimeo();
	});

	it('should extend OEmbed', function() {
		vimeo.should.be.an.instanceOf(OEmbed);
	});

	describe('#_prepareUrl', function() {
		it('should refactor invalid URLs', function() {
			vimeo._prepareUrl('http://player.vimeo.com/video/123456')
				.should.equal('http://www.vimeo.com/123456');
		});
	});
});
