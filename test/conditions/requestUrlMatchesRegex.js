import {expect} from 'chai';
import {curry} from 'lodash';
import Request from '../../src/Request';
import requestUrlMatchesRegex from '../../src/conditions/requestUrlMatchesRegex';



describe('requestUrlMatchesRegex', function() {
	it('should tell if the requested URL matches a regex', function() {
		const isYoutubeRequest =
			curry(requestUrlMatchesRegex)(
				/youtube\.com|youtu\.be/i
			);

		expect(isYoutubeRequest({
			req: Request('https://www.youtube.com/watch?v=eNcbmrKdf3U')
		})).to.be.true;

		expect(isYoutubeRequest({
			req: Request('https://youtu.be/G5R-F1RmL5Y')
		})).to.be.true;

		expect(isYoutubeRequest({
			req: Request('https://www.google.com')
		})).to.be.false;
	});
});
