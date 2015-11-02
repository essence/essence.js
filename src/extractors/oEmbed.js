/**
 *
 */
import {FORMAT_JSON} from './oEmbedFormats';



/**
 *
 */
export default function oEmbedExtractor(endpoint, format = FORMAT_JSON) {
	return async function extractOEmbed(req, res) {
		const url = endpoint.replace(/:url/i, req.url);
		const body = await req.body(url);
		let props;

		switch (format) {
			case FORMAT_JSON:
				props = JSON.parse(body);
				break;
		}

		return props
			? res.withProps(props)
			: res;
	}
}
