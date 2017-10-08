import {expect} from 'chai';
import {findServiceFromList, OEmbedFormats} from '../../../src';



describe('findServiceFromList', function() {
	const services = {
		youtube: {
			pattern: /youtube\.com|youtu\.be/i,
			endpoint: 'http://www.youtube.com/oembed?format=json&url=:url',
			format: OEmbedFormats.json
		}
	};

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

		expect(service).to.deep.equal(services.youtube);
	});
});
