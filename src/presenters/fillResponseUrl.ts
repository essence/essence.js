import Payload from '../Payload';



export default function fillResponseUrl(payload: Payload): Payload {
	if (payload.res.isEmpty() || payload.res.has('url')) {
		return payload;
	}

	const response = payload.res.withProp('url', payload.req.url);
	return payload.withResponse(response);
}
