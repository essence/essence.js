import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {spy} from 'sinon';
import {extractMetaTags, Payload} from '../../src';

use(chaiAsPromised);



describe('extractMetaTags', function() {
	it('should extract meta tags', function() {
		const getBody = spy(async () => `
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

		const payload = Payload.from('http://example.com/title');
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
