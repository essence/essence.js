/**
 *  @author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var OEmbed = require('../lib/provider/oembed');
var Vimeo = require('../lib/provider/oembed/vimeo');
var Youtube = require('../lib/provider/oembed/youtube');
var OpenGraph = require('../lib/provider/metatags/opengraph');
var TwitterCards = require('../lib/provider/metatags/twittercards');



/**
 *  Default providers configuration.
 */
var config = [{
	name: '23hq',
	scheme: /23hq\.com\/.+\/photo\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.23hq.com/23/oembed?format=json&url=:url'});
	}
}, {
	name: 'Animoto',
	scheme: /animoto\.com\/play\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://animoto.com/oembeds/create?format=json&url=:url'});
	}
}, {
	name: 'Aol',
	scheme: /on\.aol\.com\/video\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://on.aol.com/api?format=json&url=:url'});
	}
}, {
	name: 'App.net',
	scheme: /(alpha|photo)\.app\.net\/.+(\/post)?\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://alpha-api.app.net/oembed?format=json&url=:url'});
	}
}, {
	name: 'Bambuser',
	scheme: /bambuser\.com\/(v|channel)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.bambuser.com/oembed.json?url=:url'});
	}
}, {
	name: 'Bandcamp',
	scheme: /^https?:\/\/(?:[^\.]+\.)?bandcamp\.com\/(album|track)\//i,
	provider: function() {
		return new TwitterCards();
	}
}, {
	name: 'Blip.tv',
	scheme: /blip\.tv\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://blip.tv/oembed?format=json&url=:url'});
	}
}, {
	name: 'Cacoo',
	scheme: /cacoo\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://cacoo.com/oembed.json?url=:url'});
	}
}, {
	name: 'CanalPlus',
	scheme: /canalplus\.fr/i,
	provider: function() {
		return new OpenGraph();
	}
}, {
	name: 'Chirb.it',
	scheme: /chirb\.it\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://chirb.it/oembed.json?url=:url'});
	}
}, {
	name: 'CircuitLab',
	scheme: /circuitlab\.com\/circuit\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://www.circuitlab.com/circuit/oembed?format=json&url=:url'});
	}
}, {
	name: 'Clikthrough',
	scheme: /clikthrough\.com\/theater\/video\/\d+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://clikthrough.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'CollegeHumorOEmbed',
	scheme: /collegehumor\.com\/(video|embed)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.collegehumor.com/oembed.json?url=:url'});
	}
}, {
	name: 'CollegeHumorOpenGraph',
	scheme: /collegehumor\.com\/(picture|article)\/.+/i,
	provider: function() {
		return new OpenGraph();
	}
}, {
	name: 'Coub',
	scheme: /coub\.com\/(view|embed)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://coub.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'CrowdRanking',
	scheme: /crowdranking\.com\/.+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://crowdranking.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'DailyMile',
	scheme: /dailymile\.com\/people\/.+\/entries\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.dailymile.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Dailymotion',
	scheme: /dailymotion\.com/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.dailymotion.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Deviantart',
	scheme: /deviantart\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://backend.deviantart.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Dipity',
	scheme: /dipity\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.dipity.com/oembed/timeline?format=json&url=:url'});
	}
}, {
	name: 'Dotsub',
	scheme: /dotsub\.com\/view\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://dotsub.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Edocr',
	scheme: /edocr\.com\/doc\/[0-9]+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.edocr.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Flickr',
	scheme: /flickr\.com\/photos\/[a-zA-Z0-9@\\._]+\/[0-9]+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://flickr.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'FunnyOrDie',
	scheme: /funnyordie\.com\/videos\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.funnyordie.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Gist',
	scheme: /gist\.github\.com\/.+\/[0-9]+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://github.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Gmep',
	scheme: /gmep\.org\/media\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://gmep.org/oembed.json?url=:url'});
	}
}, {
	name: 'HowCast',
	scheme: /howcast\.com\/.+\/.+/i,
	provider: function() {
		return new OpenGraph();
	}
}, {
	name: 'Huffduffer',
	scheme: /huffduffer\.com\/[-.\w@]+\/\d+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://huffduffer.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Hulu',
	scheme: /hulu\.com\/watch\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.hulu.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'Ifixit',
	scheme: /ifixit\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.ifixit.com/Embed?format=json&url=:url'});
	}
}, {
	name: 'Ifttt',
	scheme: /ifttt\.com\/recipes\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.ifttt.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Imgur',
	scheme: /(imgur\.com\/(gallery|a)\/.+|imgur\.com\/.+)/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.imgur.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Instagram',
	scheme: /instagr(\.am|am\.com)\/p\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.instagram.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Jest',
	scheme: /jest\.com\/video\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.jest.com/oembed.json?url=:url'});
	}
}, {
	name: 'Justin.tv',
	scheme: /justin\.tv\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.justin.tv/api/embed/from_url.json?url=:url'});
	}
}, {
	name: 'Kickstarter',
	scheme: /kickstarter\.com\/projects\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.kickstarter.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Meetup',
	scheme: /meetup\.(com|ps)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://api.meetup.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Mixcloud',
	scheme: /mixcloud\.com\/.+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.mixcloud.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'Mobypicture',
	scheme: /(moby.to|mobypicture\.com\/user\/.+\/view)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://api.mobypicture.com/oEmbed?format=json&url=:url'});
	}
}, {
	name: 'Nfb',
	scheme: /nfb\.ca\/films\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.nfb.ca/remote/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Official.fm',
	scheme: /official\.fm\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://official.fm/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Polldaddy',
	scheme: /polldaddy\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://polldaddy.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'PollEverywhere',
	scheme: /polleverywhere\.com\/(polls|multiple_choice_polls|free_text_polls)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.polleverywhere.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Prezi',
	scheme: /prezi\.com\/.+\/.+/i,
	provider: function() {
		return new OpenGraph();
	}
}, {
	name: 'Qik',
	scheme: /qik\.com\/\w+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://qik.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'Rdio',
	scheme: /rdio\.com\/(artist|people)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.rdio.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Revision3',
	scheme: /revision3\.com\/[a-z0-9]+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://revision3.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Roomshare',
	scheme: /roomshare\.jp(\/en)?\/post\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://roomshare.jp/en/oembed.json?&url=:url'});
	}
}, {
	name: 'Sapo',
	scheme: /videos\.sapo\.pt\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://videos.sapo.pt/oembed?format=json&url=:url'});
	}
}, {
	name: 'Screenr',
	scheme: /screenr\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.screenr.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'Scribd',
	scheme: /scribd\.com\/doc\/[0-9]+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.scribd.com/providers/oembed?format=json&url=:url'});
	}
}, {
	name: 'Shoudio',
	scheme: /(shoudio\.com|shoud\.io)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://shoudio.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Sketchfab',
	scheme: /sketchfab\.com\/show\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://sketchfab.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'SlideShare',
	scheme: /slideshare\.net\/.+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.slideshare.net/api/oembed/2?format=json&url=:url'});
	}
}, {
	name: 'SoundCloud',
	scheme: /soundcloud\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://soundcloud.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'SpeakerDeck',
	scheme: /speakerdeck\.com\/.+\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://speakerdeck.com/oembed.json?url=:url'});
	}
}, {
	name: 'Spotify',
	scheme: /(open|play)\.spotify\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://embed.spotify.com/oembed?format=json&url=:url'});
	}
}, {
	name: 'TedOEmbed',
	scheme: /ted\.com\/talks\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.ted.com/talks/oembed.json?url=:url'});
	}
}, {
	name: 'TedOpenGraph',
	scheme: /ted\.com\/talks/i,
	provider: function() {
		return new OpenGraph();
	}
}, {
	name: 'Twitter',
	scheme: /twitter\.com\/[a-zA-Z0-9_]+\/status(es)?\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'https://api.twitter.com/1/statuses/oembed.json?url=:url'});
	}
}, {
	name: 'Ustream',
	scheme: /ustream\.(tv|com)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.ustream.tv/oembed?format=json&url=:url'});
	}
}, {
	name: 'Vhx',
	scheme: /vhx\.tv\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://vhx.tv/providers/oembed.json?url=:url'});
	}
}, {
	name: 'Viddler',
	scheme: /viddler\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.viddler.com/oembed/?url=:url'});
	}
}, {
	name: 'Videojug',
	scheme: /videojug\.com\/(film|interview)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.videojug.com/oembed.json?url=:url'});
	}
}, {
	name: 'Vimeo',
	scheme: /vimeo\.com/i,
	provider: function() {
		return new Vimeo({endpoint: 'http://vimeo.com/api/oembed.json?url=:url'});
	}
}, {
	name: 'Vine',
	scheme: /^https?:\/\/vine.co\/v\/[a-zA-Z0-9]+/i,
	provider: function() {
		return new TwitterCards();
	}
}, {
	name: 'WordPress',
	scheme: /wordpress\\.com\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://public-api.wordpress.com/oembed/1.0?format=json&for=me&url=:url'});
	}
}, {
	name: 'Yfrog',
	scheme: /yfrog\.(com|ru|com\.tr|it|fr|co\.il|co\.uk|com\.pl|pl|eu|us)\/.+/i,
	provider: function() {
		return new OEmbed({endpoint: 'http://www.yfrog.com/api/oembed?format=json&url=:url'});
	}
}, {
	name: 'Youtube',
	scheme: /youtube\.com|youtu\.be/i,
	provider: function() {
		return new Youtube({endpoint: 'http://www.youtube.com/oembed?format=json&url=:url'});
	}
}

/**
 * The following providers would try to embed any URL.
 */
/*
{
	name: 'OEmbed',
	scheme: /.+/,
	provider: function() {
		return new OEmbed();
	}
}, {
	name: 'OpenGraph',
	scheme: /.+/,
	provider: function() {
		return new OpenGraph();
	}
}
*/
];



module.exports = config;