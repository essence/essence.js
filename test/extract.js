import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {extract} from '../src';

use(chaiAsPromised);



describe('extract', function() {
	it('should extract an URL', function() {
		const url = 'http://example.com';
		const fillResponseUrl = async (payload) =>
			payload.withResponse((res) =>
				res.withProp('url', payload.req.url)
			);

		return expect(extract(fillResponseUrl, url))
			.to.eventually.satisfy((res) =>
				(res.get('url') === url)
			);
	});
});
