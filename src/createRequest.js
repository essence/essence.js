import {constant} from 'lodash';



/**
 *
 */
export default function createRequest(url) {

	/**
	 *	Returns the request URL.
	 *
	 *	@return string URL.
	 */
	const getUrl = constant(url);

	/**
	 *	Returns a new Request with the given URL.
	 *
	 *	@param string url URL.
	 */
	const withUrl = (url) =>
		createRequest(url);

	return {
		url: getUrl,
		withUrl
	}
}
