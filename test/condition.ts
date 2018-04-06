import {use, expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {condition as createCondition} from '../src';

use(chaiAsPromised);



describe('condition', function() {
	it('should pass a payload to the condition', function() {
		const payload = 'payload';
		const condition = createCondition(
			(p) => {
				expect(p).to.equal(payload)
				return true;
			},
			async (p) => p
		);

		return condition(payload);
	});

	it('should execute the middleware when the condition is true', function() {
		const original = 'original';
		const updated = 'updated';

		const condition = createCondition(
			() => true,
			async (p) => updated
		);

		return expect(condition(original))
			.to.eventually.equal(updated);
	});

	it('should return the payload untouched when the condition is false', function() {
		const original = 'original';
		const updated = 'updated';

		const condition = createCondition(
			() => false,
			async () => updated
		);

		return expect(condition(original))
			.to.eventually.equal(original);
	});
});
