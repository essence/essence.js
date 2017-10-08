import createRequest from './createRequest';
import createResponse from './createResponse';



/**
 *	Extracts info from the given URL using a reducer.
 *
 *	@param function reduce Reducer function.
 *	@param string url URL.
 *	@return object Payload.
 */
export default async function extract(reduce, url) {
	const {res} = await reduce({
		req: createRequest(url),
		res: createResponse()
	});

	return res;
}
