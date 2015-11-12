/**
 *
 */



/**
 *
 */
export default function condition(condition, preparator) {
	return async function(req) {
		return condition(req)
			? await preparator(req)
			: req;
	};
}
