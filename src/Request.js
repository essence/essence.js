/**
 *
 */



/**
 *
 */
export default class Request {

	constructor(url) {
		this.url = url;
	}

	withUrl(url) {
		return new Request(url);
	}
}
