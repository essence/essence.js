import {expect} from 'chai';
import Request from '../../src/Request';
import isYoutubeRequest from '../../src/conditions/isYoutubeRequest';



describe('isYoutubeRequest', function() {
	it('should return if the requested URL points to Youtube', function() {
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
