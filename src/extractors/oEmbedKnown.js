/**
 *
 */
import oEmbedExtractor from './oEmbed';



/**
 *
 */
function findService(services, url) {
	for (const name in services) {
		const service = services[name];

		if (service.filter.test(url)) {
			return service;
		}
	}

	return undefined;
}

/**
 *
 */
export default function oEmbedKnownExtractor(services) {
	return async function extractOEmbedKnown(req, res) {
		const service = findService(services, req.url);

		if (!service) {
			return res;
		}

		const extract = oEmbedExtractor(
			service.endpoint,
			service.format
		);

		return extract(req, res);
	}
}
