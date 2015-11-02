/**
 *
 */
import memoize from 'lodash/function/memoize';



/**
 *
 */
export default class Container {

	constructor(factories) {
		this.factories = {};
	}

	get(key) {
		if (key in this.factories) {
			return this.factories[key]();
		}

		throw new Error(
			`No factory found for key '${key}'`
		);
	}

	set(key, factory) {
		this.factories[key] = factory;
	}

	setUnique(key, factory) {
		this.set(key, memoize(factory));
	}

	delete(key) {
		delete this.factories[key];
	}
}
