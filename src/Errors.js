import {constant} from 'lodash';



/**
 *
 */
export default function createErrors(errors = []) {
	const count = () =>
		errors.length;

	const all = constant(errors);

	const withError = (error) =>
		createErrors(errors.concat(error));

	const toJson = (space) =>
		JSON.stringify(
			errors,
			null,
			space
		);

	return {
		count,
		all,
		withError,
		toJson
	};
}
