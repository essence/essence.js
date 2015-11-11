/**
 *
 */
import axios from 'axios';
import memoize from 'lodash/function/memoize';
import Container from './Container';
import Extractor from './Extractor';
import pipeline from './pipeline';
import {FORMAT_JSON} from './extractors/oEmbedFormats';
import metaTagsExtractor from './extractors/metaTags';
import oEmbedKnownExtractor from './extractors/oEmbedKnown';
import oEmbedAutoExtractor from './extractors/oEmbedAuto';
import mapperPresenter from './presenters/mapper';



/**
 *
 */
const container = new Container();

container.setUnique('getHeaders', () => {
	const head = memoize(axios.head);

	return async function(url) {
		return head(url).then(response => response.headers);
	};
});

container.setUnique('getBody', () => {
	const get = memoize(axios.get);

	return async function(url) {
		return get(url).then(response => response.data);
	};
});

container.setUnique('oEmbedServices', () => ({
	'youtube': {
		filter: /youtube\.com|youtu\.be/i,
		endpoint: 'http://www.youtube.com/oembed?format=json&url=:url',
		format: FORMAT_JSON
	}
}));

container.setUnique('oEmbedKnownExtractor', () => {
	return oEmbedKnownExtractor(
		container.get('getBody'),
		container.get('oEmbedServices')
	);
});

container.setUnique('oEmbedAutoExtractor', () => {
	return oEmbedAutoExtractor(
		container.get('getBody')
	);
});

container.setUnique('openGraphExtractor', () => {
	return metaTagsExtractor(
		container.get('getBody'),
		/^og:/i
	);
});

container.setUnique('openGraphMapper', () => {
	return mapperPresenter({
		'og:url': 'url',
		'og:type': 'type',
		'og:title': 'title',
		'og:description': 'description',
		'og:site_name': 'providerName',
		'og:image': 'thumbnailUrl',
		'og:image:url': 'thumbnailUrl',
		'og:image:width': 'width',
		'og:image:height': 'height',
		'og:video:width': 'width',
		'og:video:height': 'height'
	});
});

container.setUnique('twitterTagsExtractor', () => {
	return metaTagsExtractor(
		container.get('getBody'),
		/^twitter:/i
	);
});

container.setUnique('twitterTagsMapper', () => {
	return mapperPresenter({
		'twitter:card': 'type',
		'twitter:title': 'title',
		'twitter:description': 'description',
		'twitter:site': 'providerName',
		'twitter:creator': 'authorName'
	});
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
		.when(isEmptyResponse, pipeline(
			container.get('openGraphExtractor'),
			container.get('openGraphMapper')
		))
		.when(isEmptyResponse, pipeline(
			container.get('twitterTagsExtractor'),
			container.get('twitterTagsMapper')
		))
		//.always(
		//	openGraphExtractor(),
		//	twitterCardsExtractor(),
		//	urlPresenter()
		//)
		//.when(isYoutube, youtubePresenter());
});



export default container;
