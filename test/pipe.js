import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {pipe, createErrors} from '../src';

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



describe('pipe', function() {
	it('should pass a payload through the middlewares', function() {
		const reduce = pipe([
			increment,
			increment,
			increment
		]);
		
		return expect(reduce(payload))
			.to.eventually.have.property('number')
			.that.equal(4);
	});

	it('should interrupt the pipeline if a middleware throws', function() {
		const reduce = pipe([
			increment,
			throwError,
			increment
		]);

		return expect(reduce(payload))
			.to.eventually.have.property('number')
			.that.equal(2);
	});

	it('...or not', function() {
		const reduce = pipe([
			increment,
			throwError,
			increment
		], false);

		return expect(reduce(payload))
			.to.eventually.have.property('number')
			.that.equal(3);
	});

	it('should return an error if a middleware throws', function() {
		const reduce = pipe([
			throwError,
			throwError
		]);

		return expect(reduce(payload))
			.to.eventually.satisfy(
				({err}) => (err.count() === 1)
			);
	});

	it('...or many', function() {
		const reduce = pipe([
			throwError,
			throwError
		], false);

		return expect(reduce(payload))
			.to.eventually.satisfy(
				({err}) => (err.count() === 2)
			);
	});
});
