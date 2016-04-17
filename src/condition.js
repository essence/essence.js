/**
 *	Creates a condition that will execute the given middleware
 *	if the predicate returns true.
 *
 *	@param function predicate Predicate.
 *	@param function middleware Middleware.
 *	@return function Condition.
 */
export default function createCondition(predicate, middleware) {

	/**
	 *	Returns the given payload optionnaly updated by
	 *	the middleware.
	 *
	 *	@param object payload Payload.
	 *	@return object Updated payload.
	 */
	return async function condition(payload) {
		return predicate(payload)
			? await middleware(payload)
			: payload;
	};
}
