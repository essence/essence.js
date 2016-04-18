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
export default function mapResponseProps(
	mapping,
	{res, ...payload}
) {
	return {
		...payload,
		res: reduce(mapping, mapProp, res)
	};
}
