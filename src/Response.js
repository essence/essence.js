/**
 *
 */
import {Map, List} from 'immutable';
import reduce from 'lodash/collection/reduce';



/**
 *
 */
export default class Response {

	constructor(props = Map(), errors = List()) {
		this.props = props;
		this.errors = errors;
	}

	has(key) {
		return this.props.has(key);
	}

	count(key) {
		return this.all(key).length
	}

	get(key) {
		return this.first(key);
	}

	first(key, missing) {
		const all = this.all(key);

		return all.length
			? all[0]
			: missing;
	}

	all(key) {
		return this.props.get(key, []);
	}

	withProp(key, value) {
		const values = this.all(key);

		return new Response(
			this.props.set(key, values.concat(value)),
			this.errors
		);
	}

	withProps(props) {
		return reduce(props, (self, value, key) => {
			return self.withProp(key, value);
		}, this);
	}

	withError(error) {
		return new Response(
			this.props,
			this.errors.push(error)
		);
	}
}
