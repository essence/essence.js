import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {extract, pipe} from '../src';

chai.use(chaiAsPromised);



async function fillResponseUrl({req, res, err}) {
	return {
		req,
		err,
		res: res.withProp('url', req.url())
	};
}



describe('extract', function() {
	it('should extract an URL', function() {
		const url = 'http://example.com';
		const reduce = pipe([
			fillResponseUrl
		], false);

		return expect(extract(reduce, url))
			.to.eventually.satisfy(({res}) =>
				(res.get('url') === url)
			);
	});
});
