/**
 *
 */



/**
 *
 */
export default function pipeline(...middlewares) {
	return async function(req, res) {
		for (const middleware of middlewares) {
			try {
				res = await middleware(req, res);
			} catch (e) {
				return res.withError(e);
			}
		}

		return res;
	};
}
