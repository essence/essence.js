import Payload from '../Payload';



export default function isResponseEmpty(payload: Payload): boolean {
	return payload.res.isEmpty();
}
