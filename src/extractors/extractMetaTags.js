import cheerio from 'cheerio';



/**
 *	@TODO: stream the page to stop early.
 */
const extractProperties = (pattern, html) => {
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
};



/**
 *
 */
export default async function extractMetaTags(
	getBody,
	pattern,
	{req, res}
) {
	const html = await getBody(req.url());
	const props = extractProperties(pattern, html);

	return {
		req,
		res: res.withProps(props)
	};
}
