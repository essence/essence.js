import {Map} from 'immutable';
import {set, reduce} from 'lodash';



export default class Response {
	private props: Map<string, ReadonlyArray<string>>;

	constructor(props = Map<string, ReadonlyArray<string>>()) {
		this.props = props;
	}

	isEmpty() {
		return !this.props.size;
	}

	has(key) {
		return this.props.has(key);
	}

	get(key, missing?) {
		return this.first(key, missing);
	}

	// Returns the first data available for the given key.
	first(key, missing?) {
		const all = this.all(key);

		return all.length
			? all[0]
			: missing;
	}

	// Returns all data available for the given key.
	all(key) {
		return this.props.get(key, []);
	}

	// Returns all keys that have any associated data.
	keys() {
		return this.props.keySeq().toArray();
	}

	// Returns number of data associated to the given key.
	count(key) {
		return this.all(key).length;
	}

	groups(keys) {
		const groups = [];

		keys.forEach((key) => {
			this.all(key).forEach((value, i) => {
				set(groups, [i, key], value);
			});
		});

		return groups;
	}

	allGroups() {
		return this.groups(this.keys());
	}

	// Returns a new response with the given prop.
	withProp(key, value) {
		const all = this.all(key);
		const values = all.concat(value);

		return new Response(
			this.props.set(key, values)
		);
	}

	// Returns a new response with the given props.
	withProps(newProps) {
		return reduce(
			newProps,
			(response, value, key) =>
				response.withProp(key, value),
			new Response(this.props)
		);
	}

	// Returns a JSON representation of the response.
	toJson(spaces) {
		return JSON.stringify(
			this.allGroups(),
			null,
			spaces
		);
	}
}
