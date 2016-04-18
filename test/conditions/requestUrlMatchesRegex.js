import {expect} from 'chai';
import {requestUrlMatchesRegex, createRequest} from '../../src';



describe('requestUrlMatchesRegex', function() {
	it('should tell if the requested URL matches a regex', function() {
		const isYoutubeRequest =
			requestUrlMatchesRegex.bind(
				null,
				/youtube\.com|youtu\.be/i
			);

		expect(isYoutubeRequest({
			req: createRequest(
				'https://www.youtube.com/watch?v=eNcbmrKdf3U'
			)
		})).to.be.true;

		expect(isYoutubeRequest({
			req: createRequest(
				'https://youtu.be/G5R-F1RmL5Y'
			)
		})).to.be.true;

		expect(isYoutubeRequest({
			req: createRequest(
				'https://www.google.com'
			)
		})).to.be.false;
	});
});
