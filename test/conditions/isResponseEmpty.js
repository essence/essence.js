import {expect} from 'chai';
import {isResponseEmpty, createResponse} from '../../src';



describe('isResponseEmpty', function() {
	it('should tell if the response is empty', function() {
		expect(isResponseEmpty({
			res: createResponse()
		})).to.be.true;

		expect(isResponseEmpty({
			res: createResponse()
				.withProp('title', 'Title')
		})).to.be.false;
	});
});
