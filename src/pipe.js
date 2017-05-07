import {noop, clone} from 'lodash';



/**
 *	Reduces a payload through as set of middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@param function handleError .
 *	@return function The actual pipeline.
 */
export default function pipe(middlewares,	handleError = noop) {
	return async function reduce(payload) {
		let p = clone(payload);

		for (const middleware of middlewares) {
			try {
				p = await middleware(p);
			} catch (e) {
				if (!handleError(e)) {
					break;
				}
			}
		}

		return p;
	};
}
