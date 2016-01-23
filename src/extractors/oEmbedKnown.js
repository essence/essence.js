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
