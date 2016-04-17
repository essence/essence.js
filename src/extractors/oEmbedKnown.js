import {find} from 'lodash';
import extractOEmbed from './oEmbed';



/**
 *
 */
const findService = (services, url) =>
	find(services, ({filter}) => filter.test(url));



/**
 *
 */
export default async function extract(
	getBody,
	services,
	payload
) {
	const service = findService(
		services,
		payload.req.url()
	);

	if (!service) {
		return payload;
	}

	return extractOEmbed(
		getBody,
		service.endpoint,
		service.format,
		payload
	);
}
