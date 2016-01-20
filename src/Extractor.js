/**
 *
 */
import Request from './Request';
import Response from './Response';



/**
 *
 */
export default class Extractor {

	constructor(url) {
		this.preparators = [];
		this.middlewares = [];
	}

	pipePreparator(preparator) {
		this.preparators.push(preparator);
		return this;
	}

	pipeMiddleware(middleware) {
		this.middlewares.push(middleware);
		return this;
	}

	async extract(url) {
		let req = new Request(url);

		for (const preparator of this.preparators) {
			req = await preparator(req);
		}

		let res = new Response();

		for (const middleware of this.middlewares) {
			res = await middleware(req, res);
		}

		return res;
	}
}
