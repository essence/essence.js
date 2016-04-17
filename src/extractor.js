import Request from './Request';
import Response from './Response';
import Errors from './Errors';



/**
 *	Returns a function that will extract info using the
 *	given middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@return function Extractor function.
 */
export default function extractor(middlewares) {

	/**
	 *	Extracts info from the given URL.
	 *
	 *	@param string url URL.
	 *	@return object Payload.
	 */
	return async function extract(url) {
		let payload = {
			req: Request(url),
			res: Response(),
			err: Errors()
		};

		for (const middleware of middlewares) {
			payload = await middleware(payload);
		}

		return payload;
	};
}
