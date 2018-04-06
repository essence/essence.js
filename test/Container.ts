import {expect} from 'chai';
import {spy} from 'sinon';
import {constant} from 'lodash';
import {Container} from '../src';



describe('Container', function() {
	describe('get', function() {
		it('should pass itself to factories', function() {
			const container = new Container()
				.with('factory', function(get) {
					expect(get).to.equal(container.get);
				});

			container.get('factory')
		});

		it('should return the result of a factory', function() {
			const container = new Container()
				.with('factory', constant('result'));

			expect(container.get('factory'))
				.to.equal('result');
		});

		it('should throw if a factory doesn\'t exist', function() {
			const container = new Container();

			expect(() => container.get('factory'))
				.to.throw(Error);
		});
	});

	describe('with', function() {
		it('should return a new Container without affecting the original one', function() {
			const container = new Container();
			const otherContainer = container
				.with('factory', constant('result'));

			expect(() => container.get('factory'))
				.to.throw(Error);

			expect(otherContainer.get('factory'))
				.to.equal('result');
		});

		it('should call the factory for each get()', function() {
			const factory = spy(() => null);
			const container = new Container()
				.with('factory', factory);

			container.get('factory');
			container.get('factory');

			expect(factory.callCount).to.equal(2);
		});
	});

	describe('withUnique', function() {
		it('should return a new Container without affecting the original one', function() {
			const container = new Container();
			const otherContainer = container
				.withUnique('factory', () => 'result');

			expect(() => container.get('factory'))
				.to.throw(Error);

			expect(otherContainer.get('factory'))
				.to.equal('result');
		});

		it('should call the factory only once', function() {
			const factory = spy(() => null);
			const container = new Container()
				.withUnique('factory', factory);

			container.get('factory');
			container.get('factory');

			expect(factory.callCount).to.equal(1);
		});
	});
});
