/**
 *	Passes the given payload through some middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@param object payload Payload.
 *	@param object Updated payload.
 */
export default async function pipeline(
	middlewares,
	payload,
	interrupt = true
) {
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
}
