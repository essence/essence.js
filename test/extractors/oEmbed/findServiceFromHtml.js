import {expect} from 'chai';
import {forEach} from 'lodash';
import {findServiceFromHtml, OEmbedFormats, createService} from '../../../src';



describe('findServiceFromHtml', function() {
	it('should find no service', function() {
		const html = `
			<!DOCTYPE html>

			<html>
				<head></head>
				<body></body>
			</html>
		`;

		expect(findServiceFromHtml(html))
			.to.be.undefined;
	});

	forEach(OEmbedFormats, (format, name) => {
		it(`should find a service in ${name} format`, function() {
			const endpoint = 'http://example.com/oembed?url=http://example.com/video';
			const service = createService(endpoint, format);
			const html = `
				<!DOCTYPE html>

				<html>
					<head>
						<link
							rel="alternate"
							type="application/${format}+oembed"
							href="${endpoint}"
						/>
					</head>

					<body></body>
				</html>
			`;

			expect(findServiceFromHtml(html))
				.to.deep.equal(service);
		});
	});
});
