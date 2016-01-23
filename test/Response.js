import {expect} from 'chai';
import Response from '../src/Response';



describe('Response', function() {
	describe('has', function() {
		it('should tell if a prop exists', function() {
			const response = Response().withProp('foo', 'bar');

			expect(response.has('foo')).to.be.true;
			expect(response.has('bar')).to.be.false;
		});
	});

	describe('get/first', function() {
		it('should return the first prop for a key', function() {
			const response = Response()
				.withProp('foo', 'bar')
				.withProp('foo', 'baz');

			expect(response.get('foo')).to.equal('bar');
		});

		it('should return a default value for a missing key', function() {
			const response = Response();
			const missing = 'missing';

			expect(response.get('foo', missing))
				.to.equal(missing);
		});
	});

	describe('all', function() {
		it('should return all the prop for a key', function() {
			const response = Response()
				.withProp('foo', 'bar')
				.withProp('foo', 'baz');

			expect(response.all('foo'))
				.to.deep.equal(['bar', 'baz']);
		});
	});

	describe('count', function() {
		it('should return prop count for a key', function() {
			const response = Response()
				.withProp('foo', 'bar')
				.withProp('foo', 'baz');

			expect(response.count('foo')).to.equal(2);
		});
	});

	describe('groups', function() {
		it('should return prop groups for keys', function() {
			const response = Response().withProps({
				foo: ['foo1', 'foo2'],
				bar: ['bar1', 'bar2']
			});

			expect(response.groups('foo', 'bar'))
				.to.deep.equal([
					{foo: 'foo1', bar: 'bar1'},
					{foo: 'foo2', bar: 'bar2'}
				]);
		});
	});

	describe('withProp', function() {
		it('should return a new Response without affecting the original one', function() {
			const response = Response();
			const otherResponse = response.withProp('foo', 'bar');

			expect(response.get('foo')).to.be.undefined;
			expect(otherResponse.get('foo')).to.equal('bar');
		});
	});

	describe('withProps', function() {
		it('should return a new Response without affecting the original one', function() {
			const response = Response();
			const otherResponse = response.withProps({
				foo: 'bar',
				bar: 'baz'
			});

			expect(response.get('foo')).to.be.undefined;
			expect(otherResponse.get('foo')).to.equal('bar');
		});
	});
});
