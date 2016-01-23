import {expect} from 'chai';
import Errors from '../src/Errors';



describe('Errors', function() {
	describe('all', function() {
		it('should return all errors', function() {
			const errors = Errors([1, 2, 3]);

			expect(errors.all())
				.to.deep.equal([1, 2, 3]);
		});
	});

	describe('withError', function() {
		it('should return new errors without affecting the original ones', function() {
			const errors = Errors([1, 2, 3]);
			const otherErrors = errors.withError(4);

			expect(errors.all())
				.to.deep.equal([1, 2, 3]);

			expect(otherErrors.all())
				.to.deep.equal([1, 2, 3, 4]);
		});
	});
});
