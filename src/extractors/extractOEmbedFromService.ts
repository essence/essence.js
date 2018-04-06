import {parseString} from 'xml2js';
import {isEmpty, isString} from 'lodash';
import Payload from '../Payload';
import OEmbedFormat from './oEmbed/OEmbedFormat';
import OEmbedService from './oEmbed/OEmbedService';



async function parseXml(xml: string): Promise<object> {
	const options = {
		explicitArray: false
	};

	return new Promise((resolve, reject) => {
		parseString(xml, options, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data.oembed);
			}
		});
	});
}

async function parse(body: string, format: OEmbedFormat): Promise<object> {
	switch (format) {
		case OEmbedFormat.Json:
			return isString(body)
				? JSON.parse(body)
				: body

		case OEmbedFormat.Xml:
			return await parseXml(body);

		default:
			return {};
	}
}

export default async function extractOEmbedFromService(
	getBody,
	{endpoint, format}: OEmbedService,
	payload: Payload
): Promise<Payload> {
	const url = endpoint.replace(/:url/i, payload.req.url);
	const body = await getBody(url);
	const props = await parse(body, format);

	if (isEmpty(props)) {
		return payload;
	}

	const response = payload.res.withProps(props);
	return payload.withResponse(response);
}
