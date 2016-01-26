/**
 *
 */
export default function createCondition(condition, middleware) {
	return async function condition(payload) {
		return condition(payload)
			? await middleware(payload)
			: payload;
	};
}
