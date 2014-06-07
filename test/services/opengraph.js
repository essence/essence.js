/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var MetaTags = require('../../lib/services/metatags');
var OpenGraph = require('../../lib/services/opengraph');



/**
 *
 */
describe('OpenGraph', function() {
	var openGraph = null;

	beforeEach(function() {
		openGraph = new OpenGraph();
	});

	it('should extend MetaTags', function() {
		openGraph.should.be.an.instanceOf(MetaTags);
	});
});
