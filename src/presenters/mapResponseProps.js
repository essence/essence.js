import {reduce} from 'lodash';



/**
 *
 */
const mapProp = (res, to, from) =>
	res.has(from)
		? res.withProp(to, res.get(from))
		: res;



/**
 *
 */
export default function mapResponseProps(mapping, {req, res}) {
	return {
		req,
		res: reduce(mapping, mapProp, res)
	};
}
