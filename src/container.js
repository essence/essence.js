/**
 *
 */
import axios from 'axios';
import memoize from 'lodash/function/memoize';
import Container from './Container';
import Extractor from './Extractor';
import pipeline from './pipeline';
import {FORMAT_JSON} from './extractors/oEmbedFormats';
import preparatorCondition from './preparators/condition';
import extractorCondition from './extractors/condition';
import youtubePreparator from './preparators/youtube';
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

container.setUnique('youtubePreparator', youtubePreparator);

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
	const pattern = /youtube\.com|youtu\.be/i;
	return (req) => pattern.test(req.url);
});

	return (req, res) => {
	};
});

container.setUnique('extractor', () => {
	const extractor = new Extractor();
	const isEmptyResponse = container.get('isEmptyResponse');
	const isYoutubeRequest = container.get('isYoutubeRequest');

	return extractor
		.pipePreparator(
			preparatorCondition(
				isYoutubeRequest,
				container.get('youtubePreparator')
			)
		)
		.pipeMiddleware(
			extractorCondition(
				isEmptyResponse,
				container.get('oEmbedKnownExtractor')
			)
		)
		//.pipeMiddleware(
		//	extractorCondition(
		//		isEmptyResponse,
		//		container.get('oEmbedAutoExtractor')
		//	)
		//)
		.pipeMiddleware(
			extractorCondition(
				isEmptyResponse,
				pipeline(
					container.get('openGraphExtractor'),
					container.get('openGraphMapper')
				)
			)
		)
		.pipeMiddleware(
			extractorCondition(
				isEmptyResponse,
				pipeline(
					container.get('twitterTagsExtractor'),
					container.get('twitterTagsMapper')
				)
			)
		)
		//.pipeMiddleware(isYoutubeRequest, youtubePresenter())
});



export default container;
