/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
var co = require('co');
var essence = require('../index').init();



/**
 *	Here's how to fetch informations about a page.
 */
var url = 'https://www.youtube.com/watch?v=OKY6BGcx37k';

// with a callback
essence.fetch(url, function(error, infos) {
	if (error) {
		console.error(error);
	} else {
		console.log(infos);
	}
});

// within a co context
co(function *() {
	try {
		console.log(yield essence.fetch(url));
	} catch (e) {
		console.error(e);
	}
})();
