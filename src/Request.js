/**
 *
 */
import axios from 'axios';



/**
 *
 */
export default class Request {

	constructor(url) {
		this.url = url;
	}

	headers() {
		return axios.head(this.url);
	}

	body() {
		return axios.get(this.url);
	}
}
