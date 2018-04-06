import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {spy} from 'sinon';
import {extractOEmbedFromService, OEmbedFormat, Payload} from '../../src';

use(chaiAsPromised);



describe('extractOEmbedFromService', function() {
	it('should extract data from JSON', function() {
		const getBody = spy(async () => `
			{
				"version": "1.0",
				"type": "video",
				"title": "Video",
				"url": "http://example.com/video"
			}
		`);

		const payload = Payload.from('http://example.com/video');
		const service = {
			endpoint: 'http://example.com/oembed?url=:url',
			format: OEmbedFormat.Json
		};

		const promise = extractOEmbedFromService(
			getBody,
			service,
			payload
		);

		return expect(promise)
			.to.eventually.satisfy(({res}) => (
				getBody.calledWith('http://example.com/oembed?url=http://example.com/video')
				&& res.get('title') === 'Video'
				&& res.get('url') === 'http://example.com/video'
			));
	});

	it('should extract data from XML', function() {
		const getBody = spy(async () => `
			<?xml version="1.0" encoding="utf-8" standalone="yes" ?>

			<oembed>
				<version>1.0</version>
				<type>link</type>
				<title>Video</title>
				<url>http://example.com/video</url>
			</oembed>
		`);

		const payload = Payload.from('http://example.com/video');
		const service = {
			endpoint: 'http://example.com/oembed?url=:url',
			format: OEmbedFormat.Xml
		};

		const promise = extractOEmbedFromService(
			getBody,
			service,
			payload
		);

		return expect(promise)
			.to.eventually.satisfy(({res}) => (
				getBody.calledWith('http://example.com/oembed?url=http://example.com/video')
				&& res.get('title') === 'Video'
				&& res.get('url') === 'http://example.com/video'
			));
	});
});
