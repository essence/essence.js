import {expect} from 'chai';
import {mapResponseProps, createResponse} from '../../src';



describe('mapResponseProps', function() {
	it('map props', function() {
		const mapping = {
			'foo': 'baz'
		};

		const payload = {
			res: createResponse().withProp('foo', 'bar')
		};

		const mapped = mapResponseProps(mapping, payload);

		expect(mapped).to.satisfy(({res}) =>
			(res.get('baz') === 'bar')
		);
	});
});
