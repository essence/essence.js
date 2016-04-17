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
		let p = {...payload};

		try {
			for (const middleware of middlewares) {
				p = await middleware(p);
			}
		} catch (e) {
			p.err = p.err.withError(e);
		}

		return p;
	};
}
