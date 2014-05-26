/**
 *  @author Félix Girault <felix.girault@gmail.com>
 */
var Bandcamp = require('services/bandcamp');
var OEmbed = require('services/oembed');
var OpenGraph = require('services/opengraph');
var Vimeo = require('services/vimeo');
var Vine = require('services/vine');
var Youtube = require('services/youtube');



/**
 *  Default services.
 */
var services = {
	{
		'name': '23hq',
		'pattern': '#23hq\.com/.+/photo/.+#i',
		'factory': function() {
			return new OEmbed('http://www.23hq.com/23/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Animoto',
		'pattern': '#animoto\.com/play/.+#i',
		'factory': function() {
			return new OEmbed('http://animoto.com/oembeds/create?format=json&url=%s');
		}
	},
	{
		'name': 'Aol',
		'pattern': '#on\.aol\.com/video/.+#i',
		'factory': function() {
			return new OEmbed('http://on.aol.com/api?format=json&url=%s');
		}
	},
	{
		'name': 'App.net',
		'pattern': '#(alpha|photo)\.app\.net/.+(/post)?/.+#i',
		'factory': function() {
			return new OEmbed('https://alpha-api.app.net/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Bambuser',
		'pattern': '#bambuser\.com/(v|channel)/.+#i',
		'factory': function() {
			return new OEmbed('http://api.bambuser.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'Bandcamp',
		'pattern': '#^https?://(?:[^\.]+\.)?bandcamp\.com/(album|track)/#i',
		'factory': function() {
			return new Bandcamp();
		}
	},
	{
		'name': 'Blip.tv',
		'pattern': '#blip\.tv/.+#i',
		'factory': function() {
			return new OEmbed('http://blip.tv/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Cacoo',
		'pattern': '#cacoo\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://cacoo.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'CanalPlus',
		'pattern': '#canalplus\.fr#i',
		'factory': function() {
			return new OpenGraph();
		}
	},
	{
		'name': 'Chirb.it',
		'pattern': '#chirb\.it/.+#i',
		'factory': function() {
			return new OEmbed('http://chirb.it/oembed.json?url=%s');
		}
	},
	{
		'name': 'CircuitLab',
		'pattern': '#circuitlab\.com/circuit/.+#i',
		'factory': function() {
			return new OEmbed('https://www.circuitlab.com/circuit/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Clikthrough',
		'pattern': '#clikthrough\.com/theater/video/\d+#i',
		'factory': function() {
			return new OEmbed('http://clikthrough.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'CollegeHumorOEmbed',
		'pattern': '#collegehumor\.com/(video|embed)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.collegehumor.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'CollegeHumorOpenGraph',
		'pattern': '#collegehumor\.com/(picture|article)/.+#i',
		'factory': function() {
			return new OpenGraph();
		}
	},
	{
		'name': 'Coub',
		'pattern': '#coub\.com/(view|embed)/.+#i',
		'factory': function() {
			return new OEmbed('http://coub.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'CrowdRanking',
		'pattern': '#crowdranking\.com/.+/.+#i',
		'factory': function() {
			return new OEmbed('http://crowdranking.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'DailyMile',
		'pattern': '#dailymile\.com/people/.+/entries/.+#i',
		'factory': function() {
			return new OEmbed('http://api.dailymile.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Dailymotion',
		'pattern': '#dailymotion\.com#i',
		'factory': function() {
			return new OEmbed('http://www.dailymotion.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Deviantart',
		'pattern': '#deviantart\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://backend.deviantart.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Dipity',
		'pattern': '#dipity\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://www.dipity.com/oembed/timeline?format=json&url=%s');
		}
	},
	{
		'name': 'Dotsub',
		'pattern': '#dotsub\.com/view/.+#i',
		'factory': function() {
			return new OEmbed('http://dotsub.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Edocr',
		'pattern': '#edocr\.com/doc/[0-9]+/.+#i',
		'factory': function() {
			return new OEmbed('http://www.edocr.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Flickr',
		'pattern': '#flickr\.com/photos/[a-zA-Z0-9@\\._]+/[0-9]+#i',
		'factory': function() {
			return new OEmbed('http://flickr.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'FunnyOrDie',
		'pattern': '#funnyordie\.com/videos/.+#i',
		'factory': function() {
			return new OEmbed('http://www.funnyordie.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Gist',
		'pattern': '#gist\.github\.com/.+/[0-9]+#i',
		'factory': function() {
			return new OEmbed('https://github.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Gmep',
		'pattern': '#gmep\.org/media/.+#i',
		'factory': function() {
			return new OEmbed('https://gmep.org/oembed.json?url=%s');
		}
	},
	{
		'name': 'HowCast',
		'pattern': '#howcast\.com/.+/.+#i',
		'factory': function() {
			return new OpenGraph();
		}
	},
	{
		'name': 'Huffduffer',
		'pattern': '#huffduffer\.com/[-.\w@]+/\d+#i',
		'factory': function() {
			return new OEmbed('http://huffduffer.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Hulu',
		'pattern': '#hulu\.com/watch/.+#i',
		'factory': function() {
			return new OEmbed('http://www.hulu.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'Ifixit',
		'pattern': '#ifixit\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://www.ifixit.com/Embed?format=json&url=%s');
		}
	},
	{
		'name': 'Ifttt',
		'pattern': '#ifttt\.com/recipes/.+#i',
		'factory': function() {
			return new OEmbed('http://www.ifttt.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Imgur',
		'pattern': '#(imgur\.com/(gallery|a)/.+|imgur\.com/.+)#i',
		'factory': function() {
			return new OEmbed('http://api.imgur.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Instagram',
		'pattern': '#instagr(\.am|am\.com)/p/.+#i',
		'factory': function() {
			return new OEmbed('http://api.instagram.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Jest',
		'pattern': '#jest\.com/video/.+#i',
		'factory': function() {
			return new OEmbed('http://www.jest.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'Justin.tv',
		'pattern': '#justin\.tv/.+#i',
		'factory': function() {
			return new OEmbed('http://api.justin.tv/api/embed/from_url.json?url=%s');
		}
	},
	{
		'name': 'Kickstarter',
		'pattern': '#kickstarter\.com/projects/.+#i',
		'factory': function() {
			return new OEmbed('http://www.kickstarter.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Meetup',
		'pattern': '#meetup\.(com|ps)/.+#i',
		'factory': function() {
			return new OEmbed('https://api.meetup.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Mixcloud',
		'pattern': '#mixcloud\.com/.+/.+#i',
		'factory': function() {
			return new OEmbed('http://www.mixcloud.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Mobypicture',
		'pattern': '#mobypicture\.com/user/.+/view/.+#''moby.to/.+#i',
		'factory': function() {
			return new OEmbed('http://api.mobypicture.com/oEmbed?format=json&url=%s');
		}
	},
	{
		'name': 'Nfb',
		'pattern': '#nfb\.ca/films/.+#i',
		'factory': function() {
			return new OEmbed('http://www.nfb.ca/remote/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Official.fm',
		'pattern': '#official\.fm/.+#i',
		'factory': function() {
			return new OEmbed('http://official.fm/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Polldaddy',
		'pattern': '#polldaddy\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://polldaddy.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'PollEverywhere',
		'pattern': '#polleverywhere\.com/(polls|multiple_choice_polls|free_text_polls)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.polleverywhere.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Prezi',
		'pattern': '#prezi\.com/.+/.+#i',
		'factory': function() {
			return new OpenGraph();
		}
	},
	{
		'name': 'Qik',
		'pattern': '#qik\.com/\w+#i',
		'factory': function() {
			return new OEmbed('http://qik.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'Rdio',
		'pattern': '#rdio\.com/(artist|people)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.rdio.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Revision3',
		'pattern': '#revision3\.com/[a-z0-9]+/.+#i',
		'factory': function() {
			return new OEmbed('http://revision3.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Roomshare',
		'pattern': '#roomshare\.jp(/en)?/post/.+#i',
		'factory': function() {
			return new OEmbed('http://roomshare.jp/en/oembed.json?&url=%s');
		}
	},
	{
		'name': 'Sapo',
		'pattern': '#videos\.sapo\.pt/.+#i',
		'factory': function() {
			return new OEmbed('http://videos.sapo.pt/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Screenr',
		'pattern': '#screenr\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://www.screenr.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'Scribd',
		'pattern': '#scribd\.com/doc/[0-9]+/.+#i',
		'factory': function() {
			return new OEmbed('http://www.scribd.com/services/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Shoudio',
		'pattern': '#(shoudio\.com|shoud\.io)/.+#i',
		'factory': function() {
			return new OEmbed('http://shoudio.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Sketchfab',
		'pattern': '#sketchfab\.com/show/.+#i',
		'factory': function() {
			return new OEmbed('http://sketchfab.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'SlideShare',
		'pattern': '#slideshare\.net/.+/.+#i',
		'factory': function() {
			return new OEmbed('http://www.slideshare.net/api/oembed/2?format=json&url=%s');
		}
	},
	{
		'name': 'SoundCloud',
		'pattern': '#soundcloud\.com/[a-zA-Z0-9-]+/[a-zA-Z0-9-]+#i',
		'factory': function() {
			return new OEmbed('http://soundcloud.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'SpeakerDeck',
		'pattern': '#speakerdeck\.com/.+/.+#i',
		'factory': function() {
			return new OEmbed('https://speakerdeck.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'Spotify',
		'pattern': '#(open|play)\.spotify\.com/.+#i',
		'factory': function() {
			return new OEmbed('https://embed.spotify.com/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'TedOEmbed',
		'pattern': '#ted\.com/talks/*+#i',
		'factory': function() {
			return new OEmbed('http://www.ted.com/talks/oembed.json?url=%s');
		}
	},
	{
		'name': 'TedOpenGraph',
		'pattern': '#ted\.com/talks#i',
		'factory': function() {
			return new OpenGraph();
		}
	},
	{
		'name': 'Twitter',
		'pattern': '#twitter\.com/[a-zA-Z0-9_]+/status(es)?/.+#i',
		'factory': function() {
			return new OEmbed('https://api.twitter.com/1/statuses/oembed.json?url=%s');
		}
	},
	{
		'name': 'Ustream',
		'pattern': '#ustream\.(tv|com)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.ustream.tv/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Vhx',
		'pattern': '#vhx\.tv/.+#i',
		'factory': function() {
			return new OEmbed('http://vhx.tv/services/oembed.json?url=%s');
		}
	},
	{
		'name': 'Viddler',
		'pattern': '#viddler\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://www.viddler.com/oembed/?url=%s');
		}
	},
	{
		'name': 'Videojug',
		'pattern': '#videojug\.com/(film|interview)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.videojug.com/oembed.json?url=%s');
		}
	},
	{
		'name': 'Vimeo',
		'pattern': '#vimeo\.com#i',
		'factory': function() {
			return new Vimeo('http://vimeo.com/api/oembed.json?url=%s');
		}
	},
	{
		'name': 'Vine',
		'pattern': '#^https?://vine.co/v/[a-zA-Z0-9]+#i',
		'factory': function() {
			return new Vine();
		}
	},
	{
		'name': 'WordPress',
		'pattern': '#wordpress\\.com/.+#i',
		'factory': function() {
			return new OEmbed('http://public-api.wordpress.com/oembed/1.0?format=json&for=me&url=%s');
		}
	},
	{
		'name': 'Yfrog',
		'pattern': '#yfrog\.(com|ru|com\.tr|it|fr|co\.il|co\.uk|com\.pl|pl|eu|us)/.+#i',
		'factory': function() {
			return new OEmbed('http://www.yfrog.com/api/oembed?format=json&url=%s');
		}
	},
	{
		'name': 'Youtube',
		'pattern': '#youtube\.com|youtu\.be#i',
		'factory': function() {
			return new Youtube('http://www.youtube.com/oembed?format=json&url=%s');
		}
	}

	/**
	 * The following services would try to embed any URL.
	 */
	/*
	{
		'name': 'OEmbed',
		'pattern': '#.+#',
		'factory': function() {
			return new OEmbed();
		}
	},
	{
		'name': 'OpenGraph',
		'pattern': '#.+#',
		'factory': function() {
			return new OpenGraph();
		}
	}
	*/
};



module.exports = services;
