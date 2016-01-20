/**
 *
 */
import reduce from 'lodash/collection/reduce';



/**
 *
 */
export default function mapperPresenter(map) {
	return async function mapProps(req, res) {
		return reduce(map, (r, to, from) => {
			return r.has(from)
				? r.withProp(to, r.get(from))
				: r;
		}, res);
	}
};
