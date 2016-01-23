import {Map} from 'immutable';
import set from 'lodash/object/set';
import reduce from 'lodash/collection/reduce';



/**
 *
 */
export default function Response(props = Map()) {
	function hasProp(key) {
		return props.has(key);
	}

	function firstProp(key, missing) {
		const all = allProps(key);

		return all.length
			? all[0]
			: missing;
	}

	function allProps(key) {
		return props.get(key, []);
	}

	function propCount(key) {
		return allProps(key).length;
	}

	function propGroups(...keys) {
		const groups = [];

		keys.forEach((key) => {
			allProps(key).forEach((value, i) => {
				set(groups, [i, key], value);
			});
		});

		return groups;
	}

	function withProp(key, value) {
		const all = allProps(key);
		const values = all.concat(value);

		return Response(
			props.set(key, values)
		);
	}

	function withProps(newProps) {
		return reduce(newProps, (res, value, key) => {
			return res.withProp(key, value);
		}, Response(props));
	}

	return {
		withProp,
		withProps,
		has: hasProp,
		first: firstProp,
		get: firstProp,
		all: allProps,
		count: propCount,
		groups: propGroups
	};
}
