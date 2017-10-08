import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {stubTrue} from 'lodash';
import {pipe, createErrors} from '../src';

chai.use(chaiAsPromised);



async function increment(number) {
	return number + 1;
}

async function throwError() {
	throw Error();
}



describe('pipe', function() {
	it('should pass a payload through the middlewares', function() {
		const reduce = pipe([
			increment,
			increment,
			increment
		]);

		return expect(reduce(1))
			.to.eventually.equal(4);
	});

	it('should interrupt the pipeline if a middleware throws', function() {
		const reduce = pipe([
			increment,
			throwError,
			increment
		]);

		return expect(reduce(1))
			.to.eventually.equal(2);
	});

	it('...or not', function() {
		const reduce = pipe([
			increment,
			throwError,
			increment
		], stubTrue);

		return expect(reduce(1))
			.to.eventually.equal(3);
	});
});
