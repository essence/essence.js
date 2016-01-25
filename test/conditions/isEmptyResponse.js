import {expect} from 'chai';
import Response from '../../src/Response';
import isEmptyResponse from '../../src/conditions/isEmptyResponse';



describe('isEmptyResponse', function() {
	it('should tell if the response is empty', function() {
		expect(isEmptyResponse({
			res: Response()
		})).to.be.true;

		expect(isEmptyResponse({
			res: Response().withProp('title', 'Title')
		})).to.be.false;
	});
});
