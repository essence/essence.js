/**
 *
 */
import Request from './Request';
import Response from './Response';
import Errors from './Errors';



/**
 *
 */
export default function extractor(middlewares) {
	return async function extract(url) {
		let payload = {
			res: new Response(),
			req: Request(url),
			err: Errors()
		};

		for (const middleware of middlewares) {
			payload = await middleware(payload);
		}

		return payload;
	};
}
