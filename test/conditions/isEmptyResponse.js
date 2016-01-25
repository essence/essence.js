import {expect} from 'chai';
import Response from '../../src/Response';
import isEmptyResponse from '../../src/conditions/isEmptyResponse';



describe('isEmptyResponse', function() {
	it('should return if the request has a title', function() {
		expect(isEmptyResponse({
			res: Response()
		})).to.be.true;

		expect(isEmptyResponse({
			res: Response().withProp('title', 'Title')
		})).to.be.false;
	});
});
