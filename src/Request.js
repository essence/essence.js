/**
 *
 */
import axios from 'axios';
import memoize from 'lodash/function/memoize';



/**
 *
 */
export default class Request {

	constructor(url) {
		this.url = url;

		this.getHeaders = memoize(axios.head);
		this.getBody = memoize(axios.get);
	}

	async headers(url) {
		return this.getHeaders(url || this.url)
			.then(response => response.headers);
	}

	async body(url) {
		return this.getBody(url || this.url)
			.then(response => response.data);
	}
}
