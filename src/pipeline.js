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
				req: payload.req,
				res: payload.res.withError(e)
			};
		}

		return payload;
	};
}
