import {expect} from 'chai';
import {partial} from 'lodash';
import {requestUrlMatchesRegex, Payload} from '../../src';



describe('requestUrlMatchesRegex', function() {
	it('should tell if the requested URL matches a regex', function() {
		const isYoutubeRequest = partial(
			requestUrlMatchesRegex,
			/youtube\.com|youtu\.be/i
		);

		expect(isYoutubeRequest(
			Payload.from('https://www.youtube.com/watch?v=eNcbmrKdf3U')
		)).to.be.true;

		expect(isYoutubeRequest(
			Payload.from('https://youtu.be/G5R-F1RmL5Y')
		)).to.be.true;

		expect(isYoutubeRequest(
			Payload.from('https://www.google.com')
		)).to.be.false;
	});
});
