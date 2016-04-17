import {expect} from 'chai';
import Response from '../../src/Response';
import {isResponseEmpty} from '../../src';



describe('isResponseEmpty', function() {
	it('should tell if the response is empty', function() {
		expect(isResponseEmpty({
			res: Response()
		})).to.be.true;

		expect(isResponseEmpty({
			res: Response().withProp('title', 'Title')
		})).to.be.false;
	});
});
