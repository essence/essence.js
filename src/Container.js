/**
 *
 */



/**
 *
 */
export default class Container {

	constructor(factories) {
		this.factories = {};
	}

	get(key) {
		if (!(key in this.factories)) {
			throw new Error();
		}

		return this.factories[key]();
	}

	set(key, factory) {
		this.factories[key] = factory;
	}

	delete(key) {
		delete this.factories[key];
	}
}
