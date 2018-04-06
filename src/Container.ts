import {Map} from 'immutable';
import {memoize} from 'lodash';



interface Factory {
	(get): any;
}

export default class Container {
	private factories: Map<string, Factory>;

	constructor(factories = Map<string, Factory>()) {
		this.factories = factories;
		this.get = this.get.bind(this);
	}

	// Executes the factory registered for the given key and
	// returns its result.
	get<T>(key): T {
		const factory = this.factories.get(key);

		if (!factory) {
			throw new Error(`No factory found for key '${key}'`);
		}

		return factory(this.get);
	}

	// Returns a new Container with the given factory.
	with(key, factory) {
		return new Container(this.factories.set(key, factory));
	}

	// Returns a new Container with the given factory.
	// The factory will be memoized.
	withUnique(key, factory) {
		return this.with(key, memoize(factory));
	}
}
