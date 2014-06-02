/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var should = require('should');
var Service = require('../../lib/service');
var Youtube = require('../../lib/services/youtube');



/**
 *
 */
describe('Youtube', function() {
	var youtube = null;

	beforeEach(function() {
		if (youtube) {
			delete youtube;
		}

		youtube = new Youtube();
	});

	it('should extend Service', function() {
		youtube.should.be.an.instanceOf(Service);
	});

	describe('#prepareUrl', function() {
		it('should refactor invalid URLs', function() {
			youtube.prepareUrl('http://www.youtube.com/watch?v=OKY6BGcx37k&noise=noise')
				.should.equal('http://www.youtube.com/watch?v=OKY6BGcx37k');

			youtube.prepareUrl('http://www.youtube.com/v/OKY6BGcx37k')
				.should.equal('http://www.youtube.com/watch?v=OKY6BGcx37k');

			youtube.prepareUrl('http://www.youtube.com/embed/OKY6BGcx37k')
				.should.equal('http://www.youtube.com/watch?v=OKY6BGcx37k');

			youtube.prepareUrl('hhttp://youtu.be/OKY6BGcx37k')
				.should.equal('http://www.youtube.com/watch?v=OKY6BGcx37k');
		});
	});
});
