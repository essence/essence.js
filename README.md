Essence.js
==========

[![Build Status](https://travis-ci.org/felixgirault/essence.js.svg?branch=master)](https://travis-ci.org/felixgirault/essence.js)
[![Code Climate](https://codeclimate.com/github/felixgirault/essence.js.png)](https://codeclimate.com/github/felixgirault/essence.js)

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

```js
var co = require('co');

co(function *() {
	try {
		console.log(yield essence.fetch(url));
	} catch (e) {
		console.error(e);
	}
})();
```

Results
-------

```js
{
	"type": "video",
	"title": "Video title",
	"author_name": "Jean-Michel Jarre",
	"url": "http://bar.com/page.html"
	"thumbnail_url": "http://foo.com/thumbnail.jpg",
	"html": "<iframe></iframe>",
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

Plus virtually any site that supports `OEmbed` or `OpenGraph`.
