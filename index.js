/**
 *
 */
import container from './src/container';



/**
 *
 */
(function() {
	const extractor = container.get('extractor');
	const url = 'https://youtu.be/SrpeLpQWzTk';

	extractor.extract(url)
		.then(console.log)
		.catch(console.error);
})();
