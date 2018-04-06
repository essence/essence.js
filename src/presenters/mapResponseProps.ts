import {reduce} from 'lodash';
import Payload from '../Payload';
import Response from '../Response';



const mapProp = (res: Response, to: string, from: string): Response =>
	res.has(from)
		? res.withProp(to, res.get(from))
		: res;

export default function mapResponseProps(mapping: object, payload: Payload): Payload {
	return payload.withResponse(
		reduce(mapping, mapProp, payload.res)
	);
}
