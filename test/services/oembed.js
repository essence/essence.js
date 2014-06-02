/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Service = require('../../lib/service');
var OEmbed = require('../../lib/services/oembed');



/**
 *
 */
describe('OEmbed', function() {
	var oEmbed = null;

	beforeEach(function() {
		if (oEmbed) {
			delete oEmbed;
		}

		oEmbed = new OEmbed();
	});

	it('should extend Service', function() {
		oEmbed.should.be.an.instanceOf(Service);
	});

	describe('#_fetch', function() {
		it('should fetch data from a page', function() {

		});
	});

	describe('#_buildConfig', function() {
		it('should build a config from settings', function() {
			co(function *() {
				oEmbed = new OEmbed(
					'http://service.com/json?url=:url',
					'json'
				);

				oEmbed._buildConfig('url').should.eql({
					endpoint: 'http://service.com/json?url=url',
					format: 'json'
				});
			})();
		});
	});

	describe('#_extractConfig', function() {
		it('should extract an OEmbed endpoint', function() {
			var config = oEmbed._extractConfig([
				'<html>',
					'<head>',
						'<link rel="alternate" type="application/json+oembed" href="http://service.com/json" />',
						'<link rel="alternate" type="application/xml+oembed" href="http://service.com/xml" />',
					'</head>',
				'</html>'
			].join(''));

			config.should.eql({
				endpoint: 'http://service.com/json',
				format: 'json'
			});
		});
	});

	describe('#_completeEndpoint', function() {
		it('should complete the endpoint', function() {
			var endpoint = oEmbed._completeEndpoint('url');

			endpoint.should.be.equal('url');
		});
	});

	describe('#_parseJson', function() {
		it('should parse a JSON string', function() {
			var json = { 'title': 'Title' };
			var data = oEmbed._parseJson(JSON.stringify(json));

			data.should.eql(json);
		});

		it('should throw an error when a JSON string cannot be parsed', function() {
			oEmbed._parseJson.bind(oEmbed, '{,}').should.throw();
		});
	});

	describe('#_parseXml', function() {
		it('should parse a XML string', function() {
			co(function *() {
				var data = yield oEmbed._parseXml([
					'<oembed>',
						'<title>Title</title>',
					'</oembed>'
				].join(''));

				data.should.have.property('title', 'Title');
			})();
		});

		it('should throw an error when a XML string cannot be parsed', function(done) {
			co(function *() {
				try {
					yield oEmbed._parseXml('<>');
				} catch (e) {
					done();
				}
			})();
		});
	});
});
