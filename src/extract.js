import createRequest from './createRequest';
import createResponse from './createResponse';
import createErrors from './createErrors';
import pipeline from './pipeline';



/**
 *	Extracts info from the given URL using middlewares.
 *
 *	@param array middlewares Middlewares.
 *	@param string url URL.
 *	@return object Payload.
 */
export default async function extract(middlewares, url) {
	const payload = {
		req: createRequest(url),
		res: createResponse(),
		err: createErrors()
	};

	return pipeline(middlewares, payload, false);
}
