/**
 *
 */
export default function Errors(errors = []) {
	function allErrors() {
		return errors;
	}

	function withError(error) {
		return Errors(
			errors.concat(error)
		);
	}

	return {
		withError,
		withErrors: withError,
		all: allErrors
	}
}
