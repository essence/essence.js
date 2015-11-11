/**
 *
 */



/**
 *
 */
export default function condition(condition, middleware) {
	return async function(...values) {
		return condition(...values)
			? await middleware(...values)
			: values[values.length - 1];
	};
}
