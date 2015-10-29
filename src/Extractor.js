/**
 *
 */
import Request from './Request';
import Response from './Response';



/**
 *
 */
const trueCondition = () => true;



/**
 *
 */
class Extractor {

	constructor(url) {
		this.middlewares = [];
	}

	pipe(middleware, condition = trueCondition) {
		this.middlewares.push({
			middleware,
			condition
		});

		return this;
	}

	async extract(url) {
		const req = new Request(url);
		const res = new Response(url);

		for ({condition, middleware} of this.middlewares) {
			if (condition(req, res)) {
				try {
					await middleware(req, res);
				} catch(e) {
					console.error(e);
				}
			}
		}

		return Promise.resolve(res);
	}
}
