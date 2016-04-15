import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import container from '../src/container';

chai.use(chaiAsPromised);



const html = `
	<!DOCTYPE html>

	<html>
		<head>
			<meta property="og:site_name" content="YouTube">
			<meta property="og:url" content="https://www.youtube.com/watch?v=MjtCNkJhGl8">
			<meta property="og:title" content="Umkulu - Kungulu Didgeridoo Tribal Festif - Boomerang">
			<meta property="og:image" content="https://i.ytimg.com/vi/MjtCNkJhGl8/maxresdefault.jpg">
		</head>

		<body></body>
	</html>
`;



describe('extract', function() {
	it('should extract an URL', function() {
		const extract = container
			.with('getBody', () => html)
			.get('extractor');

		extract().catch((e) =>
			console.error(e)
		);

		return expect(extract(html))
			.to.eventually.satisfy(({res}) =>
				(res.get('provider_name') === 'YouTube')
			);
	});
});
