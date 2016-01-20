/**
 *
 */
import container from './src/container';



/**
 *
 */
(function() {
	const extract = container.get('extractor');
	const url = 'https://youtu.be/SrpeLpQWzTk';

	extract(url)
		.then(console.log)
		.catch(console.error);
})();
