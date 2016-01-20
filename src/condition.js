/**
 *
 */



/**
 *
 */
export default function condition(condition, middleware) {
	return async function(payload) {
		return condition(payload)
			? await middleware(payload)
			: payload;
	};
}
