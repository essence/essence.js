Essence.js
==========

[![Build Status](https://travis-ci.org/felixgirault/essence.js.svg?branch=master)](https://travis-ci.org/felixgirault/essence.js)

Installation
------------

```
npm install essence
```

Basic usage
-----------

The node way :

```js
var essence = require('essence').init();
var url = 'https://www.youtube.com/watch?v=OKY6BGcx37k';

essence.fetch(url, function(error, infos) {
	if (error) {
		console.error(error);
	} else {
		console.log(infos);
	}
});
```

or within a co context :

```
var co = require('co');

co(function *() {
	try {
		console.log(yield essence.fetch(url));
	} catch (e) {
		console.error(e);
	}
})();
```
