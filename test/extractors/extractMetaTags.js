import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import {extractMetaTags, createRequest, createResponse} from '../../src';

chai.use(chaiAsPromised);



describe('extractMetaTags', function() {
	it('should extract meta tags', function() {
		const getBody = sinon.spy(async () => `
			<!DOCTYPE html>

			<html>
				<head>
					<meta property="ns:title" content="Title" />
					<meta property="ns:url" content="http://example.com/title" />
					<meta property="other" content="other" />
				</head>

				<body></body>
			</html>
		`);

		const payload = {
			req: createRequest('http://example.com/title'),
			res: createResponse()
		};

		const promise = extractMetaTags(getBody, /^ns:/i, payload);

		return expect(promise)
			.to.eventually.satisfy(({res}) => (
				getBody.calledWith('http://example.com/title')
				&& res.get('ns:title') === 'Title'
				&& res.get('ns:url') === 'http://example.com/title'
				&& res.get('other') === undefined
			));
	});
});
