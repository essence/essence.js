import axios from 'axios';
import {memoize, property} from 'lodash';
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
import mapResponseProps from './presenters/mapResponseProps';
import fillResponseUrl from './presenters/fillResponseUrl';



/**
 *
 */
const container = createContainer()

	.withUnique('getHeaders', () => {
		const head = memoize(axios.head);

		return async function(url) {
			return head(url)
				.then(property('headers'));
		};
	})

	.withUnique('getBody', () => {
		const get = memoize(axios.get);

		return async function(url) {
			return get(url)
				.then(property('data'));
		};
	})

	.withUnique('isYoutubeRequest', () =>
		requestUrlMatchesRegex.bind(
			null,
			/youtube\.com|youtu\.be/i
		)
	)

	.withUnique('youtubePreparator', () =>
		refactorRequestUrl.bind(
			null,
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
		oEmbedKnownExtractor.bind(
			null,
			container.get('getBody'),
			container.get('oEmbedServices')
		)
	)

	.withUnique('oEmbedAutoExtractor', () =>
		oEmbedAutoExtractor.bind(
			null,
			container.get('getBody')
		)
	)

	.withUnique('openGraphExtractor', () =>
		metaTagsExtractor.bind(
			null,
			container.get('getBody'),
			/^og:/i
		)
	)

	.withUnique('openGraphMapper', () =>
		mapResponseProps.bind(null, {
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
		metaTagsExtractor.bind(
			null,
			container.get('getBody'),
			/^twitter:/i
		)
	)

	.withUnique('twitterTagsMapper', () =>
		mapResponseProps.bind(null, {
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
			pipeline.bind(null, [
				container.get('openGraphExtractor'),
				container.get('openGraphMapper')
			])
		),
		condition(
			isResponseEmpty,
			pipeline.bind(null, [
				container.get('twitterTagsExtractor'),
				container.get('twitterTagsMapper')
			])
		),
		//	condition(
		//		container.get('isYoutubeRequest'),
		//		youtubePresenter()
		//	),
		fillResponseUrl
	]))

	.withUnique('extractor', () =>
		extract.bind(null, container.get('middlewares'))
	);



export default container;
