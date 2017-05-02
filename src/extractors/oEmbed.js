import xml2js from 'xml2js';
import {isString} from 'lodash';



/**
 * 
 */
export const Formats = {
	json: 'json',
	xml: 'xml'
};

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
export default async function extract(
	getBody,
	endpoint,
	format = Formats.json,
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
