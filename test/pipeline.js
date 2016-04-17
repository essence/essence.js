import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Errors from '../src/Errors';
import {pipeline as createPipeline} from '../src';

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

		const pipeline = createPipeline(
			increment,
			increment,
			increment
		);

		return expect(pipeline(payload))
			.to.eventually.have.property('number')
			.that.equal(4);
	});

	it('should interrupt the pipeline if a middleware throws', function() {
		const payload = {
			number: 1,
			err: Errors()
		};

		const pipeline = createPipeline(
			increment,
			throwError,
			increment
		);

		return expect(pipeline(payload))
			.to.eventually.have.property('number')
			.that.equal(2);
	});

	it('should return an error if a middleware throws', function() {
		const payload = {
			err: Errors()
		};

		const pipeline = createPipeline(
			throwError
		);

		return expect(pipeline(payload))
			.to.eventually.satisfy(({err}) => {
				return err.count() === 1;
			});
	});
});
