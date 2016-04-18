import axios from 'axios';
import {memoize, curry} from 'lodash';
import createContainer from './createContainer';
import extract from './extract';
import pipeline from './pipeline';
import condition from './condition';
import isResponseEmpty from './conditions/isResponseEmpty';
import requestUrlMatchesRegex from './conditions/requestUrlMatchesRegex';
import refactorRequestUrl from './preparators/refactorRequestUrl';
import metaTagsExtractor from './extractors/metaTags';
import {FORMAT_JSON, FORMAT_XML} from './extractors/oEmbedFormats';
import oEmbedKnownExtractor from './extractors/oEmbedKnown';
import oEmbedAutoExtractor from './extractors/oEmbedAuto';
import mapperPresenter from './presenters/mapper';
import fillUrl from './presenters/fillUrl';



/**
 *
 */
const container = createContainer()
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
	.withUnique('isYoutubeRequest', () =>
		curry(requestUrlMatchesRegex)(
			/youtube\.com|youtu\.be/i
		)
	)

	.withUnique('youtubePreparator', () =>
		curry(refactorRequestUrl)(
			/^(.*)(v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)(.*)$/i,
			'https://www.youtube.com/watch?v=$3'
		)
	)

	.withUnique('oEmbedServices', () => ({
		'youtube': {
			filter: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=xml&url=:url',
			format: FORMAT_XML
		}
	}))
	.withUnique('oEmbedKnownExtractor', () =>
		curry(oEmbedKnownExtractor)(
			container.get('getBody'),
			container.get('oEmbedServices')
		)
	)
	.withUnique('oEmbedAutoExtractor', () =>
		curry(oEmbedAutoExtractor)(
			container.get('getBody')
		)
	)
	.withUnique('openGraphExtractor', () =>
		curry(metaTagsExtractor)(
			container.get('getBody'),
			/^og:/i
		)
	)
	.withUnique('openGraphMapper', () =>
		mapperPresenter({
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
		})
	)
	.withUnique('twitterTagsExtractor', () =>
		curry(metaTagsExtractor)(
			container.get('getBody'),
			/^twitter:/i
		)
	)
	.withUnique('twitterTagsMapper', () =>
		mapperPresenter({
			'twitter:card': 'type',
			'twitter:title': 'title',
			'twitter:description': 'description',
			'twitter:site': 'providerName',
			'twitter:creator': 'authorName'
		})
	)
	.withUnique('middlewares', () => ([
		condition(
			container.get('isYoutubeRequest'),
			container.get('youtubePreparator')
		),
		condition(
			isResponseEmpty,
			container.get('oEmbedKnownExtractor')
		),
		//	condition(
		//		isResponseEmpty,
		//		container.get('oEmbedAutoExtractor')
		//	),
		condition(
			isResponseEmpty,
			curry(pipeline)([
				container.get('openGraphExtractor'),
				container.get('openGraphMapper')
			])
		),
		condition(
			isResponseEmpty,
			curry(pipeline)([
				container.get('twitterTagsExtractor'),
				container.get('twitterTagsMapper')
			])
		),
		//	condition(
		//		container.get('isYoutubeRequest'),
		//		youtubePresenter()
		//	),
		fillUrl
	]))
	.withUnique('extractor', () =>
		curry(extract)(
			container.get('middlewares')
		)
	);



export default container;
