Essence
=======

[![Build Status](https://travis-ci.org/felixgirault/essence.js.svg?branch=master)](https://travis-ci.org/felixgirault/essence.js)
[![Code Climate](https://codeclimate.com/github/felixgirault/essence.js.png)](https://codeclimate.com/github/felixgirault/essence.js)

Essence extracts informations about web pages seamlessly through various protocols,
such as [OEmbed](http://oembed.com), [OpenGraph](http://opengraphprotocol.org)
or [Twitter Cards](https://dev.twitter.com/docs/cards).

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

essence.extract(url, function(error, infos) {
	if (error) {
		console.error(error);
	} else {
		console.log(infos);
	}
});
```

or within a co context :

```js
var co = require('co');

co(function *() {
	try {
		console.log(yield essence.extract(url));
	} catch (e) {
		console.error(e);
	}
})();
```

Results
-------

```js
{
	"url": "http://foo.com/page.html"
	"type": "video",
	"title": "Video title",
	"authorName": "Jean-Michel Jarre",
	"providerName": "Foo",
	"providerUrl": "http://foo.com"
	"thumbnailUrl": "http://foo.com/thumbnail.jpg",
	"thumbnailWidth": 250,
	"thumbnailHeight": 140,
	"html": "<iframe></iframe>",
	"width": 640,
	"height": 390
	// ...
}

```

Supported providers
-------------------

```
23hq
Animoto
Aol
App.net
Bambuser
Bandcamp
Blip.tv
Cacoo
CanalPlus
Chirb.it
CircuitLab
Clikthrough
CollegeHumorOEmbed
CollegeHumorOpenGraph
Coub
CrowdRanking
DailyMile
Dailymotion
Deviantart
Dipity
Dotsub
Edocr
Flickr
FunnyOrDie
Gist
Gmep
HowCast
Huffduffer
Hulu
Ifixit
Ifttt
Imgur
Instagram
Jest
Justin.tv
Kickstarter
Meetup
Mixcloud
Mobypicture
Nfb
Official.fm
Polldaddy
PollEverywhere
Prezi
Qik
Rdio
Revision3
Roomshare
Sapo
Screenr
Scribd
Shoudio
Sketchfab
SlideShare
SoundCloud
SpeakerDeck
Spotify
TedOEmbed
TedOpenGraph
Twitter
Ustream
Vhx
Viddler
Videojug
Vimeo
Vine
WordPress
Yfrog
Youtube
```

Plus virtually any site that supports `OEmbed`, `OpenGraph` or `TwitterCards`.

Configuration
-------------

An array can be passed on initialization to configure providers:

```js
var essence = require('essence').init([
	{
		// name of the provider
		name: 'Instagram',
		// regex to identify supported URLs
		scheme: /instagr(\.am|am\.com)\/p\/.+/i,
		// factory method to instanciate the provider
		provider: function() {
			return new OEmbed({
				endpoint: 'http://api.instagram.com/oembed?format=json&url=:url'
			});
		}
	},
	{
		name: '...'
		scheme: /.../
		factory: function() {}
	},
	// ...
]);
```

If no configuration is passed, the configuration in [config/providers.js](https://github.com/felixgirault/essence.js/blob/master/config/providers.js)
will be loaded.

Take a look at this file to see how the different providers can be used ;)
