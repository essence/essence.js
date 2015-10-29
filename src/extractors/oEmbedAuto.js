/**
 *
 */
import cheerio from 'cheerio';
import oEmbedExtractor from './oEmbed';



/**
 *
 */
export default function oEmbedAutoExtractor() {
	return async function extractOEmbedAuto(html, options) {
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
	const $ = cheerio.load(html);
	const links = $('link', 'head');
	const regex = /application\/(json|xml)\+oembed/i;
	const config = {};

	links.each((i, link) => {
		const type = $(link).attr('type');
		const href = $(link).attr('href');

		if (!type || !href) {
			return;
		}

		const matches = regex.exec(type);

		if (matches && matches[1]) {
			config.endpoint = href;
			config.format = matches[1];
			return false;
		}
	});

	if (!config.length) {
		throw new Error('Unable to extract any OEmbed endpoint');
	}

	return config;
}
