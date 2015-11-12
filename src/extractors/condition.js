/**
 *
 */



/**
 *
 */
export default function condition(condition, extractor) {
	return async function(req, res) {
		return condition(req, res)
			? await extractor(req, res)
			: res;
	};
}
