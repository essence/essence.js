Essence.js
==========

Installation
------------

```
npm install essence
```

Basic usage
-----------

```js
var Essence = require('../lib/essence');

var essence = new Essence();
var url = 'https://www.youtube.com/watch?v=OKY6BGcx37k';

essence.fetch(url).then(function(media) {
	console.log(media);
});
```
