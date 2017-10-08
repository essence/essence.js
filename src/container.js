import axios from 'axios';
import {memoize, partial, property, stubTrue} from 'lodash';
import createContainer from './createContainer';
import extract from './extract';
import pipe from './pipe';
import condition from './condition';
import isResponseEmpty from './conditions/isResponseEmpty';
import requestUrlMatchesRegex from './conditions/requestUrlMatchesRegex';
import refactorRequestUrl from './preparators/refactorRequestUrl';
import extractMetaTags from './extractors/extractMetaTags';
import extractOEmbed from './extractors/extractOEmbed';
import extractOEmbedFromService from './extractors/extractOEmbedFromService';
import OEmbedFormats from './extractors/oEmbed/OEmbedFormats';
import findServiceFromList from './extractors/oEmbed/findServiceFromList';
import findServiceFromUrl from './extractors/oEmbed/findServiceFromUrl';
import mapResponseProps from './presenters/mapResponseProps';
import fillResponseUrl from './presenters/fillResponseUrl';



/**
 *
 */
export default createContainer()
	.withUnique('handleError', () => stubTrue)
	.withUnique('getHeaders', () => {
		const head = memoize(axios.head);
		return async (url) =>
			head(url).then(property('headers'));
	})
	.withUnique('getBody', () => {
		const get = memoize(axios.get);
		return async (url) =>
			get(url).then(property('data'));
	})
	.withUnique('isYoutubeRequest', () =>
		partial(
			requestUrlMatchesRegex,
			/youtube\.com|youtu\.be/i
		)
	)
	.withUnique('prepareYoutubeRequest', () =>
		partial(
			refactorRequestUrl,
			/^(.*)(v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)(.*)$/i,
			'https://www.youtube.com/watch?v=$3'
		)
	)
	.withUnique('oEmbedServices', () => ({
		'youtube': {
			pattern: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=json&url=:url',
			format: OEmbedFormats.json
		}
	}))
	.withUnique('findServiceFromList', (get) =>
		partial(findServiceFromList, get('oEmbedServices'))
	)
	.withUnique('findServiceFromUrl', (get) =>
		partial(findServiceFromList, get('getBody'))
	)
	.withUnique('extractOEmbedFromService', (get) =>
		partial(extractOEmbedFromService, get('getBody'))
	)
	.withUnique('extractOEmbedFromList', (get) =>
		partial(
			extractOEmbed,
			get('findServiceFromList'),
			get('extractOEmbedFromService')
		)
	)
	.withUnique('extractOEmbedFromUrl', (get) =>
		partial(
			extractOEmbed,
			get('findServiceFromUrl'),
			get('extractOEmbedFromService')
		)
	)
	.withUnique('mapOEmbed', () =>
		partial(mapResponseProps, {
			author_name: 'authorName',
			provider_name: 'providerName',
			provider_url: 'providerUrl',
			thumbnail_url: 'thumbnailUrl',
			thumbnail_width: 'thumbnailWidth',
			thumbnail_height: 'thumbnailHeight'
		})
	)
	.withUnique('extractOpenGraph', (get) =>
		partial(extractMetaTags, get('getBody'), /^og:/i)
	)
	.withUnique('mapOpenGraph', () =>
		partial(mapResponseProps, {
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
	.withUnique('extractTwitterTags', (get) =>
		partial(extractMetaTags, get('getBody'), /^twitter:/i)
	)
	.withUnique('mapTwitterTags', () =>
		partial(mapResponseProps, {
			'twitter:card': 'type',
			'twitter:title': 'title',
			'twitter:description': 'description',
			'twitter:site': 'providerName',
			'twitter:creator': 'authorName'
		})
	)
	.withUnique('middlewares', (get) =>
		pipe([
			condition(
				get('isYoutubeRequest'),
				get('prepareYoutubeRequest')
			),
			condition(
				isResponseEmpty,
				pipe([
					get('extractOEmbedFromList'),
					get('mapOEmbed')
				])
			),
			condition(
				isResponseEmpty,
				pipe([
					get('extractOEmbedFromUrl'),
					get('mapOEmbed')
				])
			),
			condition(
				isResponseEmpty,
				pipe([
					get('extractOpenGraph'),
					get('mapOpenGraph')
				])
			),
			condition(
				isResponseEmpty,
				pipe([
					get('extractTwitterTags'),
					get('mapTwitterTags')
				])
			),
			//	condition(
			//		get('isYoutubeRequest'),
			//		youtubePresenter()
			//	),
			fillResponseUrl
		], get('handleError'))
	)
	.withUnique('extract', (get) =>
		partial(extract, get('middlewares'))
	);
