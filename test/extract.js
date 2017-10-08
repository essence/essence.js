import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {extract, pipe} from '../src';

chai.use(chaiAsPromised);



describe('extract', function() {
	it('should extract an URL', function() {
		const url = 'http://example.com';
		const fillResponseUrl = async ({req, res}) => ({
			req,
			res: res.withProp('url', req.url())
		});

		const reduce = pipe([
			fillResponseUrl
		], false);

		return expect(extract(reduce, url))
			.to.eventually.satisfy((res) =>
				(res.get('url') === url)
			);
	});
});
