import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {container} from '../src';

chai.use(chaiAsPromised);



describe('container', function() {
	describe('extract', function() {
		const propMatches = (key, value) => (res) =>
			(res.get(key) === value);

		const tests = [
			{
				name: 'a youtube video',
				url: 'https://www.youtube.com/watch?v=63VbiVqkXkE',
				test: propMatches('authorName', 'Rob Scallon')
			},
			{
				name: 'a dailymotion video',
				url: 'http://www.dailymotion.com/video/x60gir3',
				test: propMatches('providerName', 'Dailymotion')
			}
		];

		tests.forEach(({name, url, test}) => {
			it(`should extract info from ${name}`, function() {
				const extract = container.get('extract');

				return expect(extract(url))
					.to.eventually.satisfy(test);
			});
		});
	});
});
