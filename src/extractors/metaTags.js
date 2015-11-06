/**
 *
 */
import cheerio from 'cheerio';



/**
 *
 */
function extractProperties(pattern, html) {
	const $ = cheerio.load(html);
	const metas = $('meta', 'head');
	const props = {};

	metas.each((i, meta) => {
		const name = $(meta).attr('property');

		if (!name || !name.match(pattern)) {
			return;
		}

		if (!props[name]) {
			props[name] = [];
		}

		props[name].push(
			$(meta).attr('content')
		);
	});

	return props;
}

/**
 *
 */
export default function metaTagsExtractor(pattern) {
	return async function extractMetaTags(req, res) {
		const html = await req.body();
		const props = extractProperties(pattern, html);

		return res.withProps(props);
	}
}
