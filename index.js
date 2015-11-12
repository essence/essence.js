/**
 *
 */
import container from './src/container';



/**
 *
 */
(async function() {
	try {
		const extractor = container.get('extractor');
		const url = 'https://youtu.be/SrpeLpQWzTk';
		const res = await extractor.extract(url);

		console.log(res.get('title'));
	} catch (e) {
		console.error(e.stack);
	}
}());
