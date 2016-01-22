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
			req: new Request(url),
			res: new Response(),
			err: new Errors()
		};

		for (const middleware of middlewares) {
			payload = await middleware(payload);
		}

		return payload;
	};
}
