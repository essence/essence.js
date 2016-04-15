import {Map} from 'immutable';
import {memoize} from 'lodash';



/**
 *
 */
export default function createContainer(factories = Map()) {
	const get = (key) => {
		const factory = factories.get(key);

		if (!factory) {
			throw new Error(
				`No factory found for key '${key}'`
			);
		}

		return factory();
	};

	const withFactory = (key, factory) =>
		createContainer(factories.set(key, factory));

	const withUniqueFactory = (key, factory) =>
		withFactory(key, memoize(factory));

	return {
		get,
		with: withFactory,
		withUnique: withUniqueFactory
	};
}
