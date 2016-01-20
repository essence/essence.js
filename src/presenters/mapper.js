/**
 *
 */
import reduce from 'lodash/collection/reduce';



/**
 *
 */
function mapProp(res, to, from) {
	return res.has(from)
		? res.withProp(to, res.get(from))
		: res;
}

/**
 *
 */
export default function mapperPresenter(mapping) {
	return async function mapProps({req, res}) {
		return {
			req,
			res: reduce(mapping, mapProp, res)
		};
	};
}
