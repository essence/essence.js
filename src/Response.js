/**
 *
 */



/**
 *
 */
class Response {

	constructor() {
		this.props = {};
	}

	has(key) {
		return key in this.props;
	}

	count(key) {
		return this.has(key)
			? this.props[key].length
			: 0;
	}

	first(key, missing) {
		return this.count(key)
			? this.props[key][0]
			: missing;
	}

	all(key) {
		return this.has(key)
			? this.props[key]
			: [];
	}
}
