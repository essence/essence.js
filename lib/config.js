/**
 *  @author Félix Girault <felix.girault@gmail.com>
 */
var Bandcamp = require('./services/bandcamp');
var OEmbed = require('./services/oembed');
var OpenGraph = require('./services/opengraph');
var Vimeo = require('./services/vimeo');
var Vine = require('./services/vine');
var Youtube = require('./services/youtube');



/**
 *  Default services configuration.
 */
var config = [
	{
		name: '23hq',
		scheme: /23hq\.com\/.+\/photo\/.+/i,
		service: function() {
			return new OEmbed('http://www.23hq.com/23/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Animoto',
		scheme: /animoto\.com\/play\/.+/i,
		service: function() {
			return new OEmbed('http://animoto.com/oembeds/create?format=json&url=%s');
		}
	},
	{
		name: 'Aol',
		scheme: /on\.aol\.com\/video\/.+/i,
		service: function() {
			return new OEmbed('http://on.aol.com/api?format=json&url=%s');
		}
	},
	{
		name: 'App.net',
		scheme: /(alpha|photo)\.app\.net\/.+(\/post)?\/.+/i,
		service: function() {
			return new OEmbed('https://alpha-api.app.net/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Bambuser',
		scheme: /bambuser\.com\/(v|channel)\/.+/i,
		service: function() {
			return new OEmbed('http://api.bambuser.com/oembed.json?url=%s');
		}
	},
	{
		name: 'Bandcamp',
		scheme: /^https?:\/\/(?:[^\.]+\.)?bandcamp\.com\/(album|track)\//i,
		service: function() {
			return new Bandcamp();
		}
	},
	{
		name: 'Blip.tv',
		scheme: /blip\.tv\/.+/i,
		service: function() {
			return new OEmbed('http://blip.tv/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Cacoo',
		scheme: /cacoo\.com\/.+/i,
		service: function() {
			return new OEmbed('http://cacoo.com/oembed.json?url=%s');
		}
	},
	{
		name: 'CanalPlus',
		scheme: /canalplus\.fr/i,
		service: function() {
			return new OpenGraph();
		}
	},
	{
		name: 'Chirb.it',
		scheme: /chirb\.it\/.+/i,
		service: function() {
			return new OEmbed('http://chirb.it/oembed.json?url=%s');
		}
	},
	{
		name: 'CircuitLab',
		scheme: /circuitlab\.com\/circuit\/.+/i,
		service: function() {
			return new OEmbed('https://www.circuitlab.com/circuit/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Clikthrough',
		scheme: /clikthrough\.com\/theater\/video\/\d+/i,
		service: function() {
			return new OEmbed('http://clikthrough.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'CollegeHumorOEmbed',
		scheme: /collegehumor\.com\/(video|embed)\/.+/i,
		service: function() {
			return new OEmbed('http://www.collegehumor.com/oembed.json?url=%s');
		}
	},
	{
		name: 'CollegeHumorOpenGraph',
		scheme: /collegehumor\.com\/(picture|article)\/.+/i,
		service: function() {
			return new OpenGraph();
		}
	},
	{
		name: 'Coub',
		scheme: /coub\.com\/(view|embed)\/.+/i,
		service: function() {
			return new OEmbed('http://coub.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'CrowdRanking',
		scheme: /crowdranking\.com\/.+\/.+/i,
		service: function() {
			return new OEmbed('http://crowdranking.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'DailyMile',
		scheme: /dailymile\.com\/people\/.+\/entries\/.+/i,
		service: function() {
			return new OEmbed('http://api.dailymile.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Dailymotion',
		scheme: /dailymotion\.com/i,
		service: function() {
			return new OEmbed('http://www.dailymotion.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Deviantart',
		scheme: /deviantart\.com\/.+/i,
		service: function() {
			return new OEmbed('http://backend.deviantart.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Dipity',
		scheme: /dipity\.com\/.+/i,
		service: function() {
			return new OEmbed('http://www.dipity.com/oembed/timeline?format=json&url=%s');
		}
	},
	{
		name: 'Dotsub',
		scheme: /dotsub\.com\/view\/.+/i,
		service: function() {
			return new OEmbed('http://dotsub.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Edocr',
		scheme: /edocr\.com\/doc\/[0-9]+\/.+/i,
		service: function() {
			return new OEmbed('http://www.edocr.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Flickr',
		scheme: /flickr\.com\/photos\/[a-zA-Z0-9@\\._]+\/[0-9]+/i,
		service: function() {
			return new OEmbed('http://flickr.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'FunnyOrDie',
		scheme: /funnyordie\.com\/videos\/.+/i,
		service: function() {
			return new OEmbed('http://www.funnyordie.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Gist',
		scheme: /gist\.github\.com\/.+\/[0-9]+/i,
		service: function() {
			return new OEmbed('https://github.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Gmep',
		scheme: /gmep\.org\/media\/.+/i,
		service: function() {
			return new OEmbed('https://gmep.org/oembed.json?url=%s');
		}
	},
	{
		name: 'HowCast',
		scheme: /howcast\.com\/.+\/.+/i,
		service: function() {
			return new OpenGraph();
		}
	},
	{
		name: 'Huffduffer',
		scheme: /huffduffer\.com\/[-.\w@]+\/\d+/i,
		service: function() {
			return new OEmbed('http://huffduffer.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Hulu',
		scheme: /hulu\.com\/watch\/.+/i,
		service: function() {
			return new OEmbed('http://www.hulu.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'Ifixit',
		scheme: /ifixit\.com\/.+/i,
		service: function() {
			return new OEmbed('http://www.ifixit.com/Embed?format=json&url=%s');
		}
	},
	{
		name: 'Ifttt',
		scheme: /ifttt\.com\/recipes\/.+/i,
		service: function() {
			return new OEmbed('http://www.ifttt.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Imgur',
		scheme: /(imgur\.com\/(gallery|a)\/.+|imgur\.com\/.+)/i,
		service: function() {
			return new OEmbed('http://api.imgur.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Instagram',
		scheme: /instagr(\.am|am\.com)\/p\/.+/i,
		service: function() {
			return new OEmbed('http://api.instagram.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Jest',
		scheme: /jest\.com\/video\/.+/i,
		service: function() {
			return new OEmbed('http://www.jest.com/oembed.json?url=%s');
		}
	},
	{
		name: 'Justin.tv',
		scheme: /justin\.tv\/.+/i,
		service: function() {
			return new OEmbed('http://api.justin.tv/api/embed/from_url.json?url=%s');
		}
	},
	{
		name: 'Kickstarter',
		scheme: /kickstarter\.com\/projects\/.+/i,
		service: function() {
			return new OEmbed('http://www.kickstarter.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Meetup',
		scheme: /meetup\.(com|ps)\/.+/i,
		service: function() {
			return new OEmbed('https://api.meetup.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Mixcloud',
		scheme: /mixcloud\.com\/.+\/.+/i,
		service: function() {
			return new OEmbed('http://www.mixcloud.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Mobypicture',
		scheme: /(moby.to|mobypicture\.com\/user\/.+\/view)\/.+/i,
		service: function() {
			return new OEmbed('http://api.mobypicture.com/oEmbed?format=json&url=%s');
		}
	},
	{
		name: 'Nfb',
		scheme: /nfb\.ca\/films\/.+/i,
		service: function() {
			return new OEmbed('http://www.nfb.ca/remote/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Official.fm',
		scheme: /official\.fm\/.+/i,
		service: function() {
			return new OEmbed('http://official.fm/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Polldaddy',
		scheme: /polldaddy\.com\/.+/i,
		service: function() {
			return new OEmbed('http://polldaddy.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'PollEverywhere',
		scheme: /polleverywhere\.com\/(polls|multiple_choice_polls|free_text_polls)\/.+/i,
		service: function() {
			return new OEmbed('http://www.polleverywhere.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Prezi',
		scheme: /prezi\.com\/.+\/.+/i,
		service: function() {
			return new OpenGraph();
		}
	},
	{
		name: 'Qik',
		scheme: /qik\.com\/\w+/i,
		service: function() {
			return new OEmbed('http://qik.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'Rdio',
		scheme: /rdio\.com\/(artist|people)\/.+/i,
		service: function() {
			return new OEmbed('http://www.rdio.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Revision3',
		scheme: /revision3\.com\/[a-z0-9]+\/.+/i,
		service: function() {
			return new OEmbed('http://revision3.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Roomshare',
		scheme: /roomshare\.jp(\/en)?\/post\/.+/i,
		service: function() {
			return new OEmbed('http://roomshare.jp/en/oembed.json?&url=%s');
		}
	},
	{
		name: 'Sapo',
		scheme: /videos\.sapo\.pt\/.+/i,
		service: function() {
			return new OEmbed('http://videos.sapo.pt/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Screenr',
		scheme: /screenr\.com\/.+/i,
		service: function() {
			return new OEmbed('http://www.screenr.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'Scribd',
		scheme: /scribd\.com\/doc\/[0-9]+\/.+/i,
		service: function() {
			return new OEmbed('http://www.scribd.com/services/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Shoudio',
		scheme: /(shoudio\.com|shoud\.io)\/.+/i,
		service: function() {
			return new OEmbed('http://shoudio.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Sketchfab',
		scheme: /sketchfab\.com\/show\/.+/i,
		service: function() {
			return new OEmbed('http://sketchfab.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'SlideShare',
		scheme: /slideshare\.net\/.+\/.+/i,
		service: function() {
			return new OEmbed('http://www.slideshare.net/api/oembed/2?format=json&url=%s');
		}
	},
	{
		name: 'SoundCloud',
		scheme: /soundcloud\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/i,
		service: function() {
			return new OEmbed('http://soundcloud.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'SpeakerDeck',
		scheme: /speakerdeck\.com\/.+\/.+/i,
		service: function() {
			return new OEmbed('https://speakerdeck.com/oembed.json?url=%s');
		}
	},
	{
		name: 'Spotify',
		scheme: /(open|play)\.spotify\.com\/.+/i,
		service: function() {
			return new OEmbed('https://embed.spotify.com/oembed?format=json&url=%s');
		}
	},
	{
		name: 'TedOEmbed',
		scheme: /ted\.com\/talks\/.+/i,
		service: function() {
			return new OEmbed('http://www.ted.com/talks/oembed.json?url=%s');
		}
	},
	{
		name: 'TedOpenGraph',
		scheme: /ted\.com\/talks/i,
		service: function() {
			return new OpenGraph();
		}
	},
	{
		name: 'Twitter',
		scheme: /twitter\.com\/[a-zA-Z0-9_]+\/status(es)?\/.+/i,
		service: function() {
			return new OEmbed('https://api.twitter.com/1/statuses/oembed.json?url=%s');
		}
	},
	{
		name: 'Ustream',
		scheme: /ustream\.(tv|com)\/.+/i,
		service: function() {
			return new OEmbed('http://www.ustream.tv/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Vhx',
		scheme: /vhx\.tv\/.+/i,
		service: function() {
			return new OEmbed('http://vhx.tv/services/oembed.json?url=%s');
		}
	},
	{
		name: 'Viddler',
		scheme: /viddler\.com\/.+/i,
		service: function() {
			return new OEmbed('http://www.viddler.com/oembed/?url=%s');
		}
	},
	{
		name: 'Videojug',
		scheme: /videojug\.com\/(film|interview)\/.+/i,
		service: function() {
			return new OEmbed('http://www.videojug.com/oembed.json?url=%s');
		}
	},
	{
		name: 'Vimeo',
		scheme: /vimeo\.com/i,
		service: function() {
			return new Vimeo('http://vimeo.com/api/oembed.json?url=%s');
		}
	},
	{
		name: 'Vine',
		scheme: /^https?:\/\/vine.co\/v\/[a-zA-Z0-9]+/i,
		service: function() {
			return new Vine();
		}
	},
	{
		name: 'WordPress',
		scheme: /wordpress\\.com\/.+/i,
		service: function() {
			return new OEmbed('http://public-api.wordpress.com/oembed/1.0?format=json&for=me&url=%s');
		}
	},
	{
		name: 'Yfrog',
		scheme: /yfrog\.(com|ru|com\.tr|it|fr|co\.il|co\.uk|com\.pl|pl|eu|us)\/.+/i,
		service: function() {
			return new OEmbed('http://www.yfrog.com/api/oembed?format=json&url=%s');
		}
	},
	{
		name: 'Youtube',
		scheme: /youtube\.com|youtu\.be/i,
		service: function() {
			return new Youtube('http://www.youtube.com/oembed?format=json&url=%s');
		}
	}

	/**
	 * The following services would try to embed any URL.
	 */
	/*
	{
		name: 'OEmbed',
		scheme: /.+/,
		service: function() {
			return new OEmbed();
		}
	},
	{
		name: 'OpenGraph',
		scheme: /.+/,
		service: function() {
			return new OpenGraph();
		}
	}
	*/
];



module.exports = config;
