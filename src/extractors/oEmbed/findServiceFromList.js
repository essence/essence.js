import {find} from 'lodash';



/**
 *
 */
export default function findServiceFromList(services, url) {
	return find(services, ({pattern}) =>
		pattern.test(url)
	);
}