import {Map} from 'immutable';
import {memoize} from 'lodash';



/**
 *
 */
export default function createContainer(factories = Map()) {

	/**
	 *	Executes the factory regiqtered for the given key and
	 *	returns its result.
	 *
	 *	@param string key Key.
	 *	@return mixed Result.
	 */
	const get = (key) => {
		const factory = factories.get(key);

		if (!factory) {
			throw new Error(
				`No factory found for key '${key}'`
			);
		}

		return factory(get);
	};

	/**
	 *	Returns a new Container with the given factory.
	 *
	 *	@param string key Key.
	 *	@param function factory Factory.
	 *	@return Container Container.
	 */
	const withFactory = (key, factory) =>
		createContainer(factories.set(key, factory));

	/**
	 *	Returns a new Container with the given factory.
	 *	The factory will be memoized.
	 *
	 *	@param string key Key.
	 *	@param function factory Factory.
	 *	@return Container Container.
	 */
	const withUniqueFactory = (key, factory) =>
		withFactory(key, memoize(factory));

	return {
		get,
		with: withFactory,
		withUnique: withUniqueFactory
	};
}
