import {expect} from 'chai';
import Request from '../src/Request';



describe('Request', function() {
	describe('url', function() {
		it('should return the URL', function() {
			const url = 'url';
			const request = Request(url);

			expect(request.url()).to.equal(url);
		});
	});

	describe('withUrl', function() {
		it('should return a new Request without affecting the original one', function() {
			const url = 'url';
			const otherUrl = 'other-url';
			const request = Request(url);
			const otherRequest = request.withUrl(otherUrl);

			expect(request.url()).to.equal(url);
			expect(otherRequest.url()).to.equal(otherUrl);
		});
	});
});
