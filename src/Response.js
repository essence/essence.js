import {Map} from 'immutable';
import {set, reduce} from 'lodash';



/**
 *
 */
export default function createResponse(props = Map()) {
	const isEmpty = () =>
		!props.size;

	const hasProp = (key) =>
		props.has(key);

	const firstProp = (key, missing) => {
		const all = allProps(key);

		return all.length
			? all[0]
			: missing;
	};

	const allProps = (key) =>
		props.get(key, []);

	const allKeys = () =>
		props.keySeq().toArray();

	const propCount = (key) =>
		allProps(key).length;

	const propGroups = (keys) => {
		const groups = [];

		keys.forEach((key) => {
			allProps(key).forEach((value, i) => {
				set(groups, [i, key], value);
			});
		});

		return groups;
	};

	const allPropGroups = () =>
		propGroups(allKeys());

	const withProp = (key, value) => {
		const all = allProps(key);
		const values = all.concat(value);

		return createResponse(
			props.set(key, values)
		);
	};

	const withProps = (newProps) =>
		reduce(
			newProps,
			(res, value, key) =>
				res.withProp(key, value),
			createResponse(props)
		);

	const toJson = (space) =>
		JSON.stringify(
			allPropGroups(),
			null,
			space
		);

	return {
		isEmpty,
		withProp,
		withProps,
		toJson,
		has: hasProp,
		first: firstProp,
		get: firstProp,
		all: allProps,
		keys: allKeys,
		count: propCount,
		groups: propGroups,
		allGroups: allPropGroups
	};
};
