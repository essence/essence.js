import cheerio from 'cheerio';
import createService from './createService';



/**
 *	@TODO: stream the page to stop early.
 */
export default function findServiceFromHtml(html) {
	const $ = cheerio.load(html);
	const links = $('link', 'head');
	const pattern = /application\/(json|xml)\+oembed/i;
	let service;

	links.each((i, el) => {
		const link = $(el);
		const type = link.attr('type');
		const href = link.attr('href');

		if (!type || !href) {
			return;
		}

		const matches = pattern.exec(type);

		if (matches && matches[1]) {
			service = createService(href, matches[1]);
			return false;
		}
	});

	return service;
};