/**
 *
 */
import fetch from './fetch';
import oEmbedExtractor from './extractors/oEmbed';



/**
 *
 */
export default {
	'oEmbed': (endpoint) => (url, options) => (
		fetch(url)
			.then(html => oEmbedExtractor(endpoint, format))
	),
	'youtube': () => oEmbedExtractor('http://www.youtube.com/oembed?format=json&url=:url')
}
