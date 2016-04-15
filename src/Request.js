import {constant} from 'lodash';



/**
 *
 */
export default function createRequest(url) {
	const getUrl = constant(url);

	const withUrl = (url) =>
		createRequest(url);

	return {
		url: getUrl,
		withUrl
	}
}
