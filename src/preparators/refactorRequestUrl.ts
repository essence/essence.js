import Payload from '../Payload';



export default function refactorRequestUrl(
	regex: RegExp,
	replacement: string,
	payload: Payload
): Payload {
	const url = payload.req.url.replace(regex, replacement);
	const request = payload.req.withUrl(url);
	return payload.withRequest(request);
}
