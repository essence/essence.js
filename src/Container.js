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
		if (!(key in this.factories)) {
			throw new Error(
				`No factory found for key '${key}'`
			);
		}

		return this.factories[key]();
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
