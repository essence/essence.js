import Payload from './Payload';
import Middleware from './middleware';
import Request from './Request';
import Response from './Response';



// Extracts info from the given URL using a middleware.
export default async function extract(
	middleware: Middleware<Payload>,
	url: string
): Promise<Response> {
	const payload = Payload.from(url);
	const {res} = await middleware(payload);
	return res;
};
