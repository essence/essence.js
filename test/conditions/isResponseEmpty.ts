import {expect} from 'chai';
import {isResponseEmpty, Payload} from '../../src';



describe('isResponseEmpty', function() {
	it('should tell if the response is empty', function() {
		const empty = Payload.from('');
		const notEmpty = empty.withResponse((res) =>
			res.withProp('foo', 'bar')
		);

		expect(isResponseEmpty(empty)).to.be.true;
		expect(isResponseEmpty(notEmpty)).to.be.false;
	});
});
