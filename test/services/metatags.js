/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Service = require('../../lib/service');
var MetaTags = require('../../lib/services/metatags');



/**
 *
 */
describe('MetaTags', function() {
	var metaTags = null;
	var html = [
		'<html>',
			'<head>',
				'<meta property="foo" content="bar" />',
			'</head>',
		'</html>'
	].join('');

	beforeEach(function() {
		metaTags = new MetaTags();
	});

	it('should extend Service', function() {
		metaTags.should.be.an.instanceOf(Service);
	});

	describe('#_fetch', function() {
		it('should fetch data from a page', function() {
			metaTags._get = function() {
				return function(cb) {
					cb(null, html);
				}
			};

			co(function *() {
				var data = yield metaTags._fetch('');
				data.should.have.property('foo', 'bar');
			})();
		});
	});

	describe('#_extractProperties', function() {
		it('should extract meta properties', function() {
			var props = metaTags._extractProperties(html);

			props.should.eql({
				'foo': 'bar'
			});
		});

		it('should throw an error when no properties can be extracted', function() {
			metaTags._extractProperties.bind(metaTags, '').should.throw();
		});
	});
});
