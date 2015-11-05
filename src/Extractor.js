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

	when(condition, ...middlewares) {
		this.middlewares.push({
			condition,
			middlewares
		});

		return this;
	}

	always(...middlewares) {
		return this.when(
			() => true,
			middlewares
		);
	}

	async extract(url) {
		const req = new Request(url);
		let res = new Response();

		for (const {condition, middlewares} of this.middlewares) {
			if (condition(req, res)) {
				res = await this.applyMiddlewares(
					req,
					res,
					middlewares
				);
			}
		}

		return res;
	}

	async applyMiddlewares(req, res, middlewares) {
		for (const middleware of middlewares) {
			try {
				res = await middleware(req, res);
			} catch (e) {
				res = res.withError(e);
				console.log(e);
			}
		}

		return res;
	}
}
