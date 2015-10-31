/**
 *
 */
import container from './src/container';



/**
 *
 */
(async function() {
	const extractor = container.get('extractor');
	const url = 'https://www.youtube.com/watch?v=B_tjKYvEziI';
	let res;

	try {
		res = await extractor.extract(url);
	} catch (e) {
		console.error(e);
	}

	console.log(res.first('title'));
}());
