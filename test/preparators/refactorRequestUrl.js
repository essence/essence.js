import {expect} from 'chai';
import {refactorRequestUrl, createRequest} from '../../src';



describe('refactorRequestUrl', function() {
	it('should refactor URLs', function() {
		const payload = {
			req: createRequest('https://youtu.be/id')
		};

		const refactored = refactorRequestUrl(
			/^(.*)(v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)(.*)$/i,
			'https://www.youtube.com/watch?v=$3',
			payload
		);

		expect(refactored).to.satisfy(({req}) =>
			(req.url() === 'https://www.youtube.com/watch?v=id')
		);
	});
});
