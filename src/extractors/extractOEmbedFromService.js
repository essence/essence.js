import xml2js from 'xml2js';
import {isString} from 'lodash';
import Formats from './oEmbed/OEmbedFormats';



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
async function parse(body, format) {
	switch (format) {
		case Formats.json:
			return isString(body)
				? JSON.parse(body)
				: body

		case Formats.xml:
			return await parseXml(body);

		default:
			return {};
	}
}



/**
 *
 */
export default async function extractOEmbedFromService(
	getBody,
	{endpoint, format},
	{req, res}
) {
	const url = endpoint.replace(/:url/i, req.url());
	const body = await getBody(url);
	const props = await parse(body, format);

	return {
		req,
		res: res.withProps(props)
	};
}
