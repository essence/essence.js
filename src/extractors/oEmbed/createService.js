import Formats from './OEmbedFormats';



/**
 *
 */
export default function createService(endpoint, format = Formats.json) {
	return {
		endpoint,
		format
	};
};