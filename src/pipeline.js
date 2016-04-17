/**
 *	Passes the given payload through some middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@param object payload Payload.
 *	@param object Updated payload.
 */
export default async function pipeline(middlewares, payload) {
	let p = {...payload};

	try {
		for (const middleware of middlewares) {
			p = await middleware(p);
		}
	} catch (e) {
		p.err = p.err.withError(e);
	}

	return p;
}
