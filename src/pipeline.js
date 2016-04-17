/**
 *	Creates a pipeline from the given middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@return function Pipeline.
 */
export default function createPipeline(...middlewares) {

	/**
	 *	Passes the given payload through some middlewares.
	 *
	 *	@param object payload Payload.
	 *	@param object Updated payload.
	 */
	return async function pipeline(payload) {
		try {
			for (const middleware of middlewares) {
				payload = await middleware(payload);
			}
		} catch (e) {
			return {
				...payload,
				err: payload.err.withError(e)
			};
		}

		return payload;
	};
}
