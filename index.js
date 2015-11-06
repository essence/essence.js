/**
 *
 */
import container from './src/container';



/**
 *
 */
(async function() {
	const extractor = container.get('extractor');
	const url = 'https://www.youtube.com/watch?v=SrpeLpQWzTk';
	let res;

	try {
		res = await extractor.extract(url);
	} catch (e) {
		console.error(e);
	}

	console.log(res.groups(
		'og:video:url',
		'og:video:secure_url',
		'og:video:type',
		'og:video:width',
		'og:video:height'
	));
}());
