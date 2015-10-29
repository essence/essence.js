/**
 *
 */
import request from 'request';



/**
 *
 */
class Request {

	constructor(url) {
		this.url = url;
	}

	headers() {
		return request.head(this.url);
	}

	body() {
		return request.get(this.url);
	}
}
