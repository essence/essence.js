import cheerio from 'cheerio';
import extractOEmbed from './oEmbed';



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
export default async function extract(getBody, payload) {
	const html = await getBody(payload.req.url());
	const service = extractService(html);

	if (!service) {
		return payload;
	}

	return extractOEmbed(
		getBody,
		service.endpoint,
		service.format,
		payload
	);
}
