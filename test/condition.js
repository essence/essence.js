import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import createCondition from '../src/condition';

chai.use(chaiAsPromised);



describe('condition', function() {
	it('should pass a payload to the condition', function (done) {
		const payload = 'payload';
		const condition = createCondition(
			(p) => {
				expect(p).to.equal(payload);
				done();
			},
			() => {}
		);

		condition(payload);
	});

	it('should execute the middleware when the condition is true', function () {
		const original = 'original';
		const updated = 'updated';

		const condition = createCondition(
			() => true,
			() => updated
		);

		return expect(condition(original))
			.to.eventually.equal(updated);
	});

	it('should return the payload untouched when the condition is false', function () {
		const original = 'original';
		const updated = 'updated';

		const condition = createCondition(
			() => false,
			() => updated
		);

		return expect(condition(original))
			.to.eventually.equal(original);
	});
});
