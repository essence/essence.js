import {noop, clone} from 'lodash';
import Payload from './Payload';
import Middleware from './middleware';



interface ErrorHandler {
	(e: Error): boolean;
}

// Reduces a payload through as set of middlewares.
export default function pipe<T>(
	middlewares: ReadonlyArray<Middleware<T>>,
	handleError: ErrorHandler = noop
): Middleware<T> {
	return async (payload) => {
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
};
