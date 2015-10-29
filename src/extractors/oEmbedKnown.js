/**
 *
 */
import cheerio from 'cheerio';
import oEmbedExtractor from './oEmbed';



/**
 *
 */
export default function oEmbedKnownExtractor(providers) {
	return async function extractOEmbedKnown(html, options) {
		const config = extractConfig(html);
		const extract = oEmbedExtractor(
			config.endpoint,
			config.format
		);

		return extract(url, options);
	}
}

/**
 *
 */
function extractConfig(html) {

}
