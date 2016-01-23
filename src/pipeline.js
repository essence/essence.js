/**
 *
 */



/**
 *
 */
export default function pipeline(...middlewares) {
	return async function(payload) {
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
