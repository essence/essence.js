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
			if (!condition(req, res)) {
				continue;
			}

			for (const middleware of middlewares) {
				res = await middleware(req, res);
			}
		}

		return res;
	}
}
