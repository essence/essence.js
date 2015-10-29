/**
 *
 */
import Extractor from './src/Extractor';



/**
 *
 */
(async function() {
	const extractor = new Extractor();
	const isYoutube = (req, res) => !req.first('url').match(/youtube/i);
	const isEmpty = (req, res) => !res.has('title');

	extractor
		.pipe(youtubePreparator(), isYoutube)
		.pipe(oEmbedKnownExtractor(providers), isEmpty)
		.pipe(oEmbedAutoExtractor(), isEmpty)
		.pipe(openGraphExtractor())
		.pipe(twitterCardsExtractor())
		.pipe(urlPresenter())
		.pipe(youtubePresenter(), isYoutube);

	console.log(await extractor.extract(url));
}());
