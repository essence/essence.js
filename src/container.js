import axios from 'axios';
import {memoize} from 'lodash';
import Container from './Container';
import extractor from './extractor';
import pipeline from './pipeline';
import condition from './condition';
import isResponseEmpty from './conditions/isResponseEmpty';
import createRequestUrlTester from './conditions/requestUrlMatchesRegex';
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
	.withUnique('isYoutubeRequest', () =>
		createRequestUrlTester(/youtube\.com|youtu\.be/i)
	)
	.withUnique('youtubePreparator', youtubePreparator)
	.withUnique('oEmbedServices', () => ({
		'youtube': {
			filter: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=xml&url=:url',
			format: FORMAT_XML
		}
	}))
	.withUnique('oEmbedKnownExtractor', () =>
		oEmbedKnownExtractor(
			container.get('getBody'),
			container.get('oEmbedServices')
		)
	)
	.withUnique('oEmbedAutoExtractor', () =>
		oEmbedAutoExtractor(
			container.get('getBody')
		)
	)
	.withUnique('openGraphExtractor', () =>
		metaTagsExtractor(
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
		metaTagsExtractor(
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
			pipeline(
				container.get('openGraphExtractor'),
				container.get('openGraphMapper')
			)
		),
		condition(
			isResponseEmpty,
			pipeline(
				container.get('twitterTagsExtractor'),
				container.get('twitterTagsMapper')
			)
		),
		//	condition(
		//		container.get('isYoutubeRequest'),
		//		youtubePresenter()
		//	),
		fillUrl
	]))
	.withUnique('extractor', () =>
		extractor(container.get('middlewares'))
	);



export default container;
