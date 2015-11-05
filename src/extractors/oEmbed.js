/**
 *
 */
import isString from 'lodash/lang/isString';
import {FORMAT_JSON} from './oEmbedFormats';



/**
 *
 */
export default function oEmbedExtractor(endpoint, format = FORMAT_JSON) {
	return async function extractOEmbed(req, res) {
		const url = endpoint.replace(/:url/i, req.url);
		const body = await req.body(url);

		switch (format) {
			case FORMAT_JSON:
				return res.withProps(
					isString(body)
						? JSON.parse(body)
						: body
				);
		}

		return res;
	}
}
