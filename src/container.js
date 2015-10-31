/**
 *
 */
import Container from './Container';
import Extractor from './Extractor';
import {FORMAT_JSON} from './extractors/oEmbedFormats';
import oEmbedKnownExtractor from './extractors/oEmbedKnown';



/**
 *
 */
const container = new Container();

container.set('oEmbedServices', () => ({
	'youtube': {
		filter: /youtube\.com|youtu\.be/i,
		endpoint: 'http://www.youtube.com/oembed?format=json&url=%s',
		format: FORMAT_JSON
	}
}));

container.set('oEmbedKnownExtractor', () => {
	return oEmbedKnownExtractor(
		container.get('oEmbedServices')
	);
});

container.set('isEmptyResponse', () => {
	return (req, res) => !res.has('title');
});

container.set('isYoutubeRequest', () => {
	return (req, res) => {
		return !req.url.test(/youtube\.com|youtu\.be/i);
	};
});

container.set('extractor', () => {
	const extractor = new Extractor();
	const hasNoTitle = container.get('isEmptyResponse');
	const isYoutube = container.get('isYoutubeRequest');

	return extractor
		//.when(isYoutube, youtubePreparator())
		.when(hasNoTitle, container.get('oEmbedKnownExtractor'))
		//.when(hasNoTitle, oEmbedAutoExtractor())
		//.always(
		//	openGraphExtractor(),
		//	twitterCardsExtractor(),
		//	urlPresenter()
		//)
		//.when(isYoutube, youtubePresenter());
});



export default container;
