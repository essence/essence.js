/**
 *
 */
import xml2js from 'xml2js';
import isString from 'lodash/lang/isString';
import {FORMAT_JSON, FORMAT_XML} from './oEmbedFormats';



/**
 *
 */
async function parseXml(xml) {
	const options = {
		explicitArray: false
	};

	return new Promise((resolve, reject) => {
		xml2js.parseString(xml, options, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data.oembed);
			}
		});
	});
}

/**
 *
 */
export default function oEmbedExtractor(getBody, endpoint, format = FORMAT_JSON) {
	return async function extractOEmbed(req, res) {
		const url = endpoint.replace(/:url/i, req.url);
		const body = await getBody(url);

		switch (format) {
			case FORMAT_JSON:
				return res.withProps(
					isString(body)
						? JSON.parse(body)
						: body
				);

			case FORMAT_XML:
				return res.withProps(
					await parseXml(body)
				);
		}

		return res;
	}
}
