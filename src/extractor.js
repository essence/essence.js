/**
 *
 */
import Request from './Request';
import Response from './Response';



/**
 *
 */
export default function extractor(middlewares) {
	return async function extract(url) {
		let payload = {
			req: new Request(url),
			res: new Response()
		};

		for (const middleware of middlewares) {
			payload = await middleware(payload);
		}

		return payload.res;
	};
}
