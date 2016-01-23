import {Map} from 'immutable';
import memoize from 'lodash/function/memoize';



/**
 *
 */
export default function Container(factories = Map()) {
	function get(key) {
		const factory = factories.get(key);

		if (!factory) {
			throw new Error(
				`No factory found for key '${key}'`
			);
		}

		return factory();
	}

	function withFactory(key, factory) {
		return Container(
			factories.set(key, factory)
		);
	}

	function withUniqueFactory(key, factory) {
		return withFactory(key, memoize(factory));
	}

	return {
		get,
		with: withFactory,
		withUnique: withUniqueFactory
	}
}
