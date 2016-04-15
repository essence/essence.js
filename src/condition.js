/**
 *
 */
export default function createCondition(predicate, middleware) {
	return async function condition(payload) {
		return predicate(payload)
			? await middleware(payload)
			: payload;
	};
}
