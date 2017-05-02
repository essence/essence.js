/**
 *	Reduces a payload through as set of middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@param object payload Payload.
 *	@return function The actual pipeline.
 */
export default function pipe(middlewares,	interrupt = true) {
	return async function reduce(payload) {
		let p = {...payload};

		for (const middleware of middlewares) {
			try {
				p = await middleware(p);
			} catch (e) {
				p.err = p.err.withError(e);

				if (interrupt) {
					break;
				}
			}
		}

		return p;
	};
}
