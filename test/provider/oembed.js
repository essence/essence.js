/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var Provider = require('../../lib/provider');
var OEmbed = require('../../lib/provider/oembed');



/**
 *
 */
describe('OEmbed', function() {
	var oEmbed = null;

	beforeEach(function() {
		oEmbed = new OEmbed();
	});

	it('should extend Provider', function() {
		oEmbed.should.be.an.instanceOf(Provider);
	});

	describe('#_extract', function() {
		it('should extract data from a page', function() {

		});
	});

	describe('#_buildConfig', function() {
		it('should build a config from settings', function() {
			co(function *() {
				oEmbed = new OEmbed({
					endpoint: 'http://provider.com/json?url=:url',
					format: 'json'
				});

				oEmbed._buildConfig('url').should.eql({
					endpoint: 'http://provider.com/json?url=url',
					format: 'json'
				});
			})();
		});
	});

	describe('#_extractConfig', function() {
		it('should extract config from a page', function() {
			var config = oEmbed._extractConfig([
				'<html>',
					'<head>',
						'<link rel="alternate" type="application/json+oembed" href="http://provider.com/json" />',
						'<link rel="alternate" type="application/xml+oembed" href="http://provider.com/xml" />',
					'</head>',
				'</html>'
			].join(''));

			config.should.eql({
				endpoint: 'http://provider.com/json',
				format: 'json'
			});
		});

		it('should throw an exception when no config can be extracted', function() {
			oEmbed._extractConfig('').should.throw();
		});
	});

	describe('#_completeEndpoint', function() {
		it('should append query string', function() {
			var endpoint = oEmbed._completeEndpoint('url', {
				width: 800,
				height: 600
			});

			endpoint.should.be.equal('url?width=800&height=600');
		});

		it('should complete existing query string', function() {
			var endpoint = oEmbed._completeEndpoint('url?param=value', {
				width: 800
			});

			endpoint.should.be.equal('url?param=value&width=800');
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
