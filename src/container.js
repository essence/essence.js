import axios from 'axios';
import memoize from 'lodash/function/memoize';
import Container from './Container';
import extractor from './extractor';
import pipeline from './pipeline';
import condition from './condition';
import isYoutubeRequest from './conditions/isYoutubeRequest';
import isEmptyResponse from './conditions/isEmptyResponse';
import youtubePreparator from './preparators/youtube';
import metaTagsExtractor from './extractors/metaTags';
import {FORMAT_JSON, FORMAT_XML} from './extractors/oEmbedFormats';
import oEmbedKnownExtractor from './extractors/oEmbedKnown';
import oEmbedAutoExtractor from './extractors/oEmbedAuto';
import mapperPresenter from './presenters/mapper';
import fillUrl from './presenters/fillUrl';



/**
 *
 */
const container = Container()
	.withUnique('getHeaders', () => {
		const head = memoize(axios.head);

		return async function(url) {
			return head(url).then(response => response.headers);
		};
	})
	.withUnique('getBody', () => {
		const get = memoize(axios.get);

		return async function(url) {
			return get(url).then(response => response.data);
		};
	})
	.withUnique('youtubePreparator', youtubePreparator)
	.withUnique('oEmbedServices', () => ({
		'youtube': {
			filter: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=xml&url=:url',
			format: FORMAT_XML
		}
	}))
	.withUnique('oEmbedKnownExtractor', () => {
		return oEmbedKnownExtractor(
			container.get('getBody'),
			container.get('oEmbedServices')
		);
	})
	.withUnique('oEmbedAutoExtractor', () => {
		return oEmbedAutoExtractor(
			container.get('getBody')
		);
	})
	.withUnique('openGraphExtractor', () => {
		return metaTagsExtractor(
			container.get('getBody'),
			/^og:/i
		);
	})
	.withUnique('openGraphMapper', () => {
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
	})
	.withUnique('twitterTagsExtractor', () => {
		return metaTagsExtractor(
			container.get('getBody'),
			/^twitter:/i
		);
	})
	.withUnique('twitterTagsMapper', () => {
		return mapperPresenter({
			'twitter:card': 'type',
			'twitter:title': 'title',
			'twitter:description': 'description',
			'twitter:site': 'providerName',
			'twitter:creator': 'authorName'
		});
	})
	.withUnique('middlewares', () => {
		return [
			condition(
				isYoutubeRequest,
				container.get('youtubePreparator')
			),
			condition(
				isEmptyResponse,
				container.get('oEmbedKnownExtractor')
			),
			//	condition(
			//		isEmptyResponse,
			//		container.get('oEmbedAutoExtractor')
			//	),
			condition(
				isEmptyResponse,
				pipeline(
					container.get('openGraphExtractor'),
					container.get('openGraphMapper')
				)
			),
			condition(
				isEmptyResponse,
				pipeline(
					container.get('twitterTagsExtractor'),
					container.get('twitterTagsMapper')
				)
			),
			//	condition(
			//		isYoutubeRequest,
			//		youtubePresenter()
			//	),
			fillUrl
		];
	})
	.withUnique('extractor', () => {
		return extractor(
			container.get('middlewares')
		);
	});



export default container;
