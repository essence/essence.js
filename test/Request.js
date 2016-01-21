import {expect} from 'chai';
import Request from '../src/Request';



describe('Request', function() {
	describe('constructor', function() {
		it('should store the given URL', function () {
			const url = 'url';
			const request = new Request(url);

			expect(request.url).to.equal(url);
		});
	});

	describe('withUrl', function() {
		it('should return a new Request without affecting the original one', function () {
			const url = 'url';
			const otherUrl = 'other-url';
			const request = new Request(url);
			const otherRequest = request.withUrl(otherUrl);

			expect(request.url).to.equal(url);
			expect(otherRequest.url).to.equal(otherUrl);
		});
	});
});
