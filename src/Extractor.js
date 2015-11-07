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
		this.middlewares = [];
	}

	when(condition, middleware) {
		this.middlewares.push({
			condition,
			middleware
		});

		return this;
	}

	always(middleware) {
		return this.when(
			() => true,
			middleware
		);
	}

	async extract(url) {
		const req = new Request(url);
		let res = new Response();

		for (const {condition, middleware} of this.middlewares) {
			if (condition(req, res)) {
				res = await middleware(req, res);
			}
		}

		return res;
	}
}
