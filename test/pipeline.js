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

const payload = {
	number: 1,
	err: createErrors()
};



describe('pipeline', function() {
	it('should pass a payload through the middlewares', function() {
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
		const middlewares = [
			increment,
			throwError,
			increment
		];

		return expect(pipeline(middlewares, payload))
			.to.eventually.have.property('number')
			.that.equal(2);
	});

	it('...or not', function() {
		const middlewares = [
			increment,
			throwError,
			increment
		];

		return expect(pipeline(middlewares, payload, false))
			.to.eventually.have.property('number')
			.that.equal(3);
	});

	it('should return an error if a middleware throws', function() {
		const middlewares = [
			throwError,
			throwError
		];

		return expect(pipeline(middlewares, payload))
			.to.eventually.satisfy(
				({err}) => (err.count() === 1)
			);
	});

	it('...or many', function() {
		const middlewares = [
			throwError,
			throwError
		];

		return expect(pipeline(middlewares, payload, false))
			.to.eventually.satisfy(
				({err}) => (err.count() === 2)
			);
	});
});
