import Payload from '../Payload';



export default function requestUrlMatchesRegex(
	regex: RegExp,
	payload: Payload
): boolean {
	return regex.test(payload.req.url);
}
