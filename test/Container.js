import {expect} from 'chai';
import {Container} from '../src';



describe('Container', function() {
	describe('get', function() {
		it('should return the result of a factory', function() {
			const container = Container().with(
				'factory',
				() => 'result'
			);

			expect(container.get('factory'))
				.to.equal('result');
		});

		it('should throw if a factory doesn\'t exist', function() {
			const container = Container();

			expect(() => container.get('factory'))
				.to.throw(Error);
		});
	});

	describe('with', function() {
		it('should return a new Container without affecting the original one', function() {
			const container = Container();
			const otherContainer = container.with(
				'factory',
				() => 'result'
			);

			expect(() => container.get('factory'))
				.to.throw(Error);

			expect(otherContainer.get('factory'))
				.to.equal('result');
		});

		it('should call the factory for each get()', function() {
			let count = 0;
			const factory = () => ++count;
			const container = Container().with(
				'factory',
				factory
			);

			expect(container.get('factory')).to.equal(1);
			expect(container.get('factory')).to.equal(2);
		});
	});

	describe('withUnique', function() {
		it('should return a new Container without affecting the original one', function() {
			const container = Container();
			const otherContainer = container.withUnique(
				'factory',
				() => 'result'
			);

			expect(() => container.get('factory'))
				.to.throw(Error);

			expect(otherContainer.get('factory'))
				.to.equal('result');
		});

		it('should call the factory only once', function() {
			let count = 0;
			const factory = () => ++count;
			const container = Container().withUnique(
				'factory',
				factory
			);

			expect(container.get('factory')).to.equal(1);
			expect(container.get('factory')).to.equal(1);
		});
	});
});
