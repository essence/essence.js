import {Map} from 'immutable';
import {set, reduce} from 'lodash';



/**
 *
 */
export default function createResponse(props = Map()) {

	/**
	 *	Tells if the response is empty.
	 *
	 *	@return bool
	 */
	const isEmpty = () =>
		!props.size;

	/**
	 *	Tells if the response has any data for the given key.
	 *
	 *	@param string key Key.
	 *	@return bool
	 */
	const hasProp = (key) =>
		props.has(key);

	/**
	 *	Returns the first data available for the given key.
	 *
	 *	@param string key Key.
	 *	@param string missing Value to be returned if the key
	 *		does not exists.
	 *	@return mixed Data.
	 */
	const firstProp = (key, missing) => {
		const all = allProps(key);

		return all.length
			? all[0]
			: missing;
	};

	/**
	 *	Returns all data available for the given key.
	 *
	 *	@param string key Key.
	 *	@return array Data.
	 */
	const allProps = (key) =>
		props.get(key, []);

	/**
	 *	Returns all keys that has any associated data.
	 *
	 * @return array Data.
	 */
	const allKeys = () =>
		props.keySeq().toArray();

	/**
	 *	Returns number of data associated to the given key.
	 *
	 *	@param string key Key.
	 *	@return int Count.
	 */
	const propCount = (key) =>
		allProps(key).length;

	/**
	 *
	 */
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

	/**
	 *	Returns a new response with the given prop.
	 *
	 *	@param string key Key.
	 *	@param mixed value Value.
	 *	@return Response Response.
	 */
	const withProp = (key, value) => {
		const all = allProps(key);
		const values = all.concat(value);

		return createResponse(
			props.set(key, values)
		);
	};

	/**
	 *	Returns a new response with the given props.
	 *
	 *	@param object newProps New Props.
	 *	@return Response Response.
	 */
	const withProps = (newProps) =>
		reduce(
			newProps,
			(res, value, key) =>
				res.withProp(key, value),
			createResponse(props)
		);

	/**
	 *	Returns a JSON representation of the response.
	 *
	 *	@param int spaces Number of spaces used for indentation.
	 */
	const toJson = (spaces) =>
		JSON.stringify(
			allPropGroups(),
			null,
			spaces
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
