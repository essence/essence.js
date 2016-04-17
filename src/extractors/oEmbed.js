import xml2js from 'xml2js';
import {isString} from 'lodash';
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
async function parse(body, format) {
	switch (format) {
		case FORMAT_JSON:
			return isString(body)
				? JSON.parse(body)
				: body

		case FORMAT_XML:
			return await parseXml(body);

		default:
			return {};
	}
}



/**
 *
 */
export default async function extract(
	getBody,
	endpoint,
	format = FORMAT_JSON,
	{req, res, err}
) {
	const url = endpoint.replace(/:url/i, req.url());
	const body = await getBody(url);
	const props = await parse(body, format);

	return {
		req,
		res: res.withProps(props),
		err
	};
}
