import {find} from 'lodash';
import oEmbedExtractor from './oEmbed';



/**
 *
 */
const findService = (services, url) =>
	find(services, ({filter}) => filter.test(url));



/**
 *
 */
export default function oEmbedKnownExtractor(getBody, services) {
	return async function extractOEmbedKnown(payload) {
		const service = findService(
			services,
			payload.req.url()
		);

		if (!service) {
			return payload;
		}

		const extract = oEmbedExtractor(
			getBody,
			service.endpoint,
			service.format
		);

		return extract(payload);
	};
}
