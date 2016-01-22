import {List} from 'immutable';



/**
 *
 */
export default class Errors extends List {

	withError(error) {
		return this.push(error);
	}
}
