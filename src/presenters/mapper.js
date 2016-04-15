import {reduce} from 'lodash';



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
	return async function mapProps({req, res, err}) {
		return {
			req,
			res: reduce(mapping, mapProp, res),
			err
		};
	};
}
