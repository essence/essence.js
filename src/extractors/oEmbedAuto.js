import cheerio from 'cheerio';
import oEmbedExtractor from './oEmbed';



/**
 *	@TODO: stream the page to stop early.
 */
const extractService = (html) => {
	const $ = cheerio.load(html);
	const links = $('link', 'head');
	const pattern = /application\/(json|xml)\+oembed/i;
	let service;

	links.each((i, link) => {
		const type = $(link).attr('type');
		const href = $(link).attr('href');

		if (!type || !href) {
			return;
		}

		const matches = pattern.exec(type);

		if (matches && matches[1]) {
			service = {
				endpoint: href,
				format: matches[1]
			}

			return false;
		}
	});

	return service;
};



/**
 *
 */
export default function oEmbedAutoExtractor(getBody) {
	return async function extractOEmbedAuto(payload) {
		const html = await getBody(payload.req.url());
		const service = extractService(html);

		if (!service) {
			return payload;
		}

		const extract = oEmbedExtractor(
			getBody,
			service.endpoint,
			service.format
		);

		return extract(payload);
	};
}
