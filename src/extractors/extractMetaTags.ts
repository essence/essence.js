import {load} from 'cheerio';
import {isEmpty} from 'lodash';
import Payload from '../Payload';



// @TODO: stream the page to stop early.
const extractProperties = (pattern: RegExp, html: string): object => {
	const $ = load(html);
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

export default async function extractMetaTags(
	getBody,
	pattern: RegExp,
	payload: Payload
): Promise<Payload> {
	const html = await getBody(payload.req.url);
	const props = extractProperties(pattern, html);

	if (isEmpty(props)) {
		return payload;
	}

	const response = payload.res.withProps(props);
	return payload.withResponse(response);
}
