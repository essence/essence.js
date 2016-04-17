import {constant} from 'lodash';



/**
 *
 */
export default function createErrors(errors = []) {

	/**
	 *	Returns the error count.
	 *
	 *	@return int Count.
	 */
	const count = () =>
		errors.length;

	/**
	 *	Returns all errors.
	 *
	 *	@return array Errors.
	 */
	const all = constant(errors);

	/**
	 *	Returns a new Errors with the given error added.
	 *
	 *	@params mixed error Error.
	 *	@return Errors Errors.
	 */
	const withError = (error) =>
		createErrors(errors.concat(error));

	/**
	 *	Returns a JSON representation of the errors.
	 *
	 *	@param int spaces Number of spaces used for indentation.
	 */
	const toJson = (spaces) =>
		JSON.stringify(
			errors,
			null,
			spaces
		);

	return {
		count,
		all,
		withError,
		toJson
	};
}
