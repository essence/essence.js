/**
 *
 */
export default function Errors(errors = []) {
	function errorCount() {
		return errors.length;
	}

	function allErrors() {
		return errors;
	}

	function withError(error) {
		return Errors(
			errors.concat(error)
		);
	}

	function toJson(space) {
		return JSON.stringify(
			errors,
			null,
			space
		);
	}

	return {
		toJson,
		count: errorCount,
		withError,
		withErrors: withError,
		all: allErrors
	}
}
