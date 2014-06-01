/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var fetch = require('../index').fetch;



/**
 *	Here's how to fetch informations about a page.
 */
fetch('https://www.youtube.com/watch?v=OKY6BGcx37k').then(
	function(media) {
		console.log(media);
	},
	function(error) {
		console.error(error);
	}
);
