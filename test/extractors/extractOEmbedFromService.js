import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import {
	extractOEmbedFromService,
	OEmbedFormats,
	createService,
	createRequest,
	createResponse
} from '../../src';

chai.use(chaiAsPromised);



describe('extractOEmbedFromService', function() {
	it('should extract data from JSON', function() {
		const getBody = sinon.spy(async () => `
			{
				"version": "1.0",
				"type": "video",
				"title": "Video",
				"url": "http://example.com/video"
			}
		`);

		const payload = {
			req: createRequest('http://example.com/video'),
			res: createResponse()
		};

		const service = createService(
			'http://example.com/oembed?url=:url',
			OEmbedFormats.json
		);

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
		const getBody = sinon.spy(async () => `
			<?xml version="1.0" encoding="utf-8" standalone="yes" ?>

			<oembed>
				<version>1.0</version>
				<type>link</type>
				<title>Video</title>
				<url>http://example.com/video</url>
			</oembed>
		`);

		const payload = {
			req: createRequest('http://example.com/video'),
			res: createResponse()
		};

		const service = createService(
			'http://example.com/oembed?url=:url',
			OEmbedFormats.xml
		);

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
