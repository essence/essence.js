/**
 *
 */
import Container from './Container';
import Extractor from './Extractor';
import {FORMAT_JSON} from './extractors/oEmbedFormats';
import metaTagsExtractor from './extractors/metaTags';
import oEmbedKnownExtractor from './extractors/oEmbedKnown';
import oEmbedAutoExtractor from './extractors/oEmbedAuto';



/**
 *
 */
const container = new Container();

container.setUnique('oEmbedServices', () => ({
	'youtube': {
		filter: /youtube\.com|youtu\.be/i,
		endpoint: 'http://www.youtube.com/oembed?format=json&url=:url',
		format: FORMAT_JSON
	}
}));

container.setUnique('oEmbedKnownExtractor', () => {
	return oEmbedKnownExtractor(
		container.get('oEmbedServices')
	);
});

container.setUnique('oEmbedAutoExtractor', oEmbedAutoExtractor);

container.setUnique('openGraphExtractor', () => {
	return metaTagsExtractor(/^og:/i);
});

container.setUnique('twitterTagsExtractor', () => {
	return metaTagsExtractor(/^twitter:/i);
});

container.setUnique('isEmptyResponse', () => {
	return (req, res) => !res.has('title');
});

container.setUnique('isYoutubeRequest', () => {
	return (req, res) => {
		return !req.url.test(/youtube\.com|youtu\.be/i);
	};
});

container.setUnique('extractor', () => {
	const extractor = new Extractor();
	const isEmptyResponse = container.get('isEmptyResponse');
	const isYoutube = container.get('isYoutubeRequest');

	return extractor
		//.when(isYoutube, youtubePreparator())
		//.when(isEmptyResponse, container.get('oEmbedKnownExtractor'))
		//.when(isEmptyResponse, container.get('oEmbedAutoExtractor'))
		.when(isEmptyResponse, container.get('openGraphExtractor'))
		.when(isEmptyResponse, container.get('twitterTagsExtractor'))
		//.always(
		//	openGraphExtractor(),
		//	twitterCardsExtractor(),
		//	urlPresenter()
		//)
		//.when(isYoutube, youtubePresenter());
});



export default container;
