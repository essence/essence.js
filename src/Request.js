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
		this.getBody = memoize(axios.body);
	}

	async headers(url) {
		return this.getHeaders(url || this.url);
	}

	async body() {
		return this.getBody(url || this.url);
	}
}
