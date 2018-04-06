import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {defaultContainer, Response} from '../src';

use(chaiAsPromised);



describe('container', function() {
	describe('extract', function() {
		interface Extractor {
			(url: string): Promise<Response>;
		}

		const propMatches = (key, value) => (res) =>
			(res.get(key) === value);

		const tests = [
			{
				name: 'a YouTube video',
				url: 'https://www.youtube.com/watch?v=63VbiVqkXkE',
				test: propMatches('authorName', 'Rob Scallon')
			},
			{
				name: 'a Dailymotion video',
				url: 'http://www.dailymotion.com/video/x60gir3',
				test: propMatches('providerName', 'Dailymotion')
			},
			{
				name: 'an AlloCine article',
				url: 'http://www.allocine.fr/film/fichefilm_gen_cfilm=1975.html',
				test: propMatches('providerName', 'AlloCiné')
			},
			{
				name: 'a Twitter status',
				url: 'https://twitter.com/_fg_/status/917007377089613825',
				test: propMatches('authorName', 'Félix Girault')
			}
		];

		tests.forEach(({name, url, test}) => {
			it(`should extract info from ${name}`, function() {
				const extract = defaultContainer.get<Extractor>('extract');
				return expect(extract(url))
					.to.eventually.satisfy(test);
			});
		});
	});
});
