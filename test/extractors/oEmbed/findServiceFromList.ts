import {expect} from 'chai';
import {findServiceFromList, OEmbedFormat} from '../../../src';



describe('findServiceFromList', function() {
	const services = [
		{
			name: 'YouTube',
			pattern: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=json&url=:url',
			format: OEmbedFormat.Json
		}
	];

	it('should find no service', function() {
		const service = findServiceFromList(
			services,
			'http://example.com'
		);

		expect(service).to.be.undefined;
	});

	it('should find a service', function() {
		const service = findServiceFromList(
			services,
			'https://www.youtube.com/watch?v=ZuZz9NSOh10'
		);

		expect(service).to.deep.equal(services[0]);
	});
});
