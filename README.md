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

```js
var fetch = require('essence').fetch;

fetch('https://www.youtube.com/watch?v=OKY6BGcx37k', function(error, infos) {
	if (error) {
		console.error(error);
	} else {
		console.log(infos);
	}
});
```
