


export default class Request {
	constructor(readonly url: string) {}

	withUrl(url) {
		return new Request(url);
	}
}
