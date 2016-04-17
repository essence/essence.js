import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {pipeline, createErrors} from '../src';

chai.use(chaiAsPromised);



async function increment(payload) {
	return {
		...payload,
		number: payload.number + 1
	};
}

async function throwError() {
	throw Error();
}



describe('pipeline', function() {
	it('should pass a payload through the middlewares', function() {
		const payload = {
			number: 1
		};

		const middlewares = [
			increment,
			increment,
			increment
		];

		return expect(pipeline(middlewares, payload))
			.to.eventually.have.property('number')
			.that.equal(4);
	});

	it('should interrupt the pipeline if a middleware throws', function() {
		const payload = {
			number: 1,
			err: createErrors()
		};

		const middlewares = [
			increment,
			throwError,
			increment
		];

		return expect(pipeline(middlewares, payload))
			.to.eventually.have.property('number')
			.that.equal(2);
	});

	it('should return an error if a middleware throws', function() {
		const payload = {
			err: createErrors()
		};

		const middlewares = [
			throwError
		];

		return expect(pipeline(middlewares, payload))
			.to.eventually.satisfy(
				({err}) => (err.count() === 1)
			);
	});
});
