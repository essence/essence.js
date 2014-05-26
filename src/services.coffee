#
Bandcamp = require('services/bandcamp')
OEmbed = require('services/oembed')
OpenGraph = require('services/opengraph')
Vimeo = require('services/vimeo')
Vine = require('services/vine')
Youtube = require('services/youtube')



# Default services.
services =
  '23hq':
    'pattern': '#23hq\.com/.+/photo/.+#i'
    'factory': () -> new OEmbed('http://www.23hq.com/23/oembed?format=json&url=%s')

  'Animoto':
    'pattern': '#animoto\.com/play/.+#i'
    'factory': () -> new OEmbed('http://animoto.com/oembeds/create?format=json&url=%s')

  'Aol':
    'pattern': '#on\.aol\.com/video/.+#i'
    'factory': () -> new OEmbed('http://on.aol.com/api?format=json&url=%s')

  'App.net':
    'pattern': '#(alpha|photo)\.app\.net/.+(/post)?/.+#i'
    'factory': () -> new OEmbed('https://alpha-api.app.net/oembed?format=json&url=%s')

  'Bambuser':
    'pattern': '#bambuser\.com/(v|channel)/.+#i'
    'factory': () -> new OEmbed('http://api.bambuser.com/oembed.json?url=%s')

  'Bandcamp':
    'pattern': '#^https?://(?:[^\.]+\.)?bandcamp\.com/(album|track)/#i'
    'factory': () -> new Bandcamp()

  'Blip.tv':
    'pattern': '#blip\.tv/.+#i'
    'factory': () -> new OEmbed('http://blip.tv/oembed?format=json&url=%s')

  'Cacoo':
    'pattern': '#cacoo\.com/.+#i'
    'factory': () -> new OEmbed('http://cacoo.com/oembed.json?url=%s')

  'CanalPlus':
    'pattern': '#canalplus\.fr#i'
    'factory': () -> new OpenGraph()

  'Chirb.it':
    'pattern': '#chirb\.it/.+#i'
    'factory': () -> new OEmbed('http://chirb.it/oembed.json?url=%s')

  'CircuitLab':
    'pattern': '#circuitlab\.com/circuit/.+#i'
    'factory': () -> new OEmbed('https://www.circuitlab.com/circuit/oembed?format=json&url=%s')

  'Clikthrough':
    'pattern': '#clikthrough\.com/theater/video/\d+#i'
    'factory': () -> new OEmbed('http://clikthrough.com/services/oembed?format=json&url=%s')

  'CollegeHumorOEmbed':
    'pattern': '#collegehumor\.com/(video|embed)/.+#i'
    'factory': () -> new OEmbed('http://www.collegehumor.com/oembed.json?url=%s')

  'CollegeHumorOpenGraph':
    'pattern': '#collegehumor\.com/(picture|article)/.+#i'
    'factory': () -> new OpenGraph()

  'Coub':
    'pattern': '#coub\.com/(view|embed)/.+#i'
    'factory': () -> new OEmbed('http://coub.com/api/oembed.json?url=%s')

  'CrowdRanking':
    'pattern': '#crowdranking\.com/.+/.+#i'
    'factory': () -> new OEmbed('http://crowdranking.com/api/oembed.json?url=%s')

  'DailyMile':
    'pattern': '#dailymile\.com/people/.+/entries/.+#i'
    'factory': () -> new OEmbed('http://api.dailymile.com/oembed?format=json&url=%s')

  'Dailymotion':
    'pattern': '#dailymotion\.com#i'
    'factory': () -> new OEmbed('http://www.dailymotion.com/services/oembed?format=json&url=%s')

  'Deviantart':
    'pattern': '#deviantart\.com/.+#i'
    'factory': () -> new OEmbed('http://backend.deviantart.com/oembed?format=json&url=%s')

  'Dipity':
    'pattern': '#dipity\.com/.+#i'
    'factory': () -> new OEmbed('http://www.dipity.com/oembed/timeline?format=json&url=%s')

  'Dotsub':
    'pattern': '#dotsub\.com/view/.+#i'
    'factory': () -> new OEmbed('http://dotsub.com/services/oembed?format=json&url=%s')

  'Edocr':
    'pattern': '#edocr\.com/doc/[0-9]+/.+#i'
    'factory': () -> new OEmbed('http://www.edocr.com/api/oembed?format=json&url=%s')

  'Flickr':
    'pattern': '#flickr\.com/photos/[a-zA-Z0-9@\\._]+/[0-9]+#i'
    'factory': () -> new OEmbed('http://flickr.com/services/oembed?format=json&url=%s')

  'FunnyOrDie':
    'pattern': '#funnyordie\.com/videos/.+#i'
    'factory': () -> new OEmbed('http://www.funnyordie.com/oembed?format=json&url=%s')

  'Gist':
    'pattern': '#gist\.github\.com/.+/[0-9]+#i'
    'factory': () -> new OEmbed('https://github.com/api/oembed?format=json&url=%s')

  'Gmep':
    'pattern': '#gmep\.org/media/.+#i'
    'factory': () -> new OEmbed('https://gmep.org/oembed.json?url=%s')

  'HowCast':
    'pattern': '#howcast\.com/.+/.+#i'
    'factory': () -> new OpenGraph()

  'Huffduffer':
    'pattern': '#huffduffer\.com/[-.\w@]+/\d+#i'
    'factory': () -> new OEmbed('http://huffduffer.com/oembed?format=json&url=%s')

  'Hulu':
    'pattern': '#hulu\.com/watch/.+#i'
    'factory': () -> new OEmbed('http://www.hulu.com/api/oembed.json?url=%s')

  'Ifixit':
    'pattern': '#ifixit\.com/.+#i'
    'factory': () -> new OEmbed('http://www.ifixit.com/Embed?format=json&url=%s')

  'Ifttt':
    'pattern': '#ifttt\.com/recipes/.+#i'
    'factory': () -> new OEmbed('http://www.ifttt.com/oembed?format=json&url=%s')

  'Imgur':
    'pattern': '#(imgur\.com/(gallery|a)/.+|imgur\.com/.+)#i'
    'factory': () -> new OEmbed('http://api.imgur.com/oembed?format=json&url=%s')

  'Instagram':
    'pattern': '#instagr(\.am|am\.com)/p/.+#i'
    'factory': () -> new OEmbed('http://api.instagram.com/oembed?format=json&url=%s')

  'Jest':
    'pattern': '#jest\.com/video/.+#i'
    'factory': () -> new OEmbed('http://www.jest.com/oembed.json?url=%s')

  'Justin.tv':
    'pattern': '#justin\.tv/.+#i'
    'factory': () -> new OEmbed('http://api.justin.tv/api/embed/from_url.json?url=%s')

  'Kickstarter':
    'pattern': '#kickstarter\.com/projects/.+#i'
    'factory': () -> new OEmbed('http://www.kickstarter.com/services/oembed?format=json&url=%s')

  'Meetup':
    'pattern': '#meetup\.(com|ps)/.+#i'
    'factory': () -> new OEmbed('https://api.meetup.com/oembed?format=json&url=%s')

  'Mixcloud':
    'pattern': '#mixcloud\.com/.+/.+#i'
    'factory': () -> new OEmbed('http://www.mixcloud.com/oembed?format=json&url=%s')

  'Mobypicture':
    'pattern': '#mobypicture\.com/user/.+/view/.+#''moby.to/.+#i'
    'factory': () -> new OEmbed('http://api.mobypicture.com/oEmbed?format=json&url=%s')

  'Nfb':
    'pattern': '#nfb\.ca/films/.+#i'
    'factory': () -> new OEmbed('http://www.nfb.ca/remote/services/oembed?format=json&url=%s')

  'Official.fm':
    'pattern': '#official\.fm/.+#i'
    'factory': () -> new OEmbed('http://official.fm/services/oembed?format=json&url=%s')

  'Polldaddy':
    'pattern': '#polldaddy\.com/.+#i'
    'factory': () -> new OEmbed('http://polldaddy.com/oembed?format=json&url=%s')

  'PollEverywhere':
    'pattern': '#polleverywhere\.com/(polls|multiple_choice_polls|free_text_polls)/.+#i'
    'factory': () -> new OEmbed('http://www.polleverywhere.com/services/oembed?format=json&url=%s')

  'Prezi':
    'pattern': '#prezi\.com/.+/.+#i'
    'factory': () -> new OpenGraph()

  'Qik':
    'pattern': '#qik\.com/\w+#i'
    'factory': () -> new OEmbed('http://qik.com/api/oembed.json?url=%s')

  'Rdio':
    'pattern': '#rdio\.com/(artist|people)/.+#i'
    'factory': () -> new OEmbed('http://www.rdio.com/api/oembed?format=json&url=%s')

  'Revision3':
    'pattern': '#revision3\.com/[a-z0-9]+/.+#i'
    'factory': () -> new OEmbed('http://revision3.com/api/oembed?format=json&url=%s')

  'Roomshare':
    'pattern': '#roomshare\.jp(/en)?/post/.+#i'
    'factory': () -> new OEmbed('http://roomshare.jp/en/oembed.json?&url=%s')

  'Sapo':
    'pattern': '#videos\.sapo\.pt/.+#i'
    'factory': () -> new OEmbed('http://videos.sapo.pt/oembed?format=json&url=%s')

  'Screenr':
    'pattern': '#screenr\.com/.+#i'
    'factory': () -> new OEmbed('http://www.screenr.com/api/oembed.json?url=%s')

  'Scribd':
    'pattern': '#scribd\.com/doc/[0-9]+/.+#i'
    'factory': () -> new OEmbed('http://www.scribd.com/services/oembed?format=json&url=%s')

  'Shoudio':
    'pattern': '#(shoudio\.com|shoud\.io)/.+#i'
    'factory': () -> new OEmbed('http://shoudio.com/api/oembed?format=json&url=%s')

  'Sketchfab':
    'pattern': '#sketchfab\.com/show/.+#i'
    'factory': () -> new OEmbed('http://sketchfab.com/oembed?format=json&url=%s')

  'SlideShare':
    'pattern': '#slideshare\.net/.+/.+#i'
    'factory': () -> new OEmbed('http://www.slideshare.net/api/oembed/2?format=json&url=%s')

  'SoundCloud':
    'pattern': '#soundcloud\.com/[a-zA-Z0-9-]+/[a-zA-Z0-9-]+#i'
    'factory': () -> new OEmbed('http://soundcloud.com/oembed?format=json&url=%s')

  'SpeakerDeck':
    'pattern': '#speakerdeck\.com/.+/.+#i'
    'factory': () -> new OEmbed('https://speakerdeck.com/oembed.json?url=%s')

  'Spotify':
    'pattern': '#(open|play)\.spotify\.com/.+#i'
    'factory': () -> new OEmbed('https://embed.spotify.com/oembed?format=json&url=%s')

  'TedOEmbed':
    'pattern': '#ted\.com/talks/*+#i'
    'factory': () -> new OEmbed('http://www.ted.com/talks/oembed.json?url=%s')

  'TedOpenGraph':
    'pattern': '#ted\.com/talks#i'
    'factory': () -> new OpenGraph()

  'Twitter':
    'pattern': '#twitter\.com/[a-zA-Z0-9_]+/status(es)?/.+#i'
    'factory': () -> new OEmbed('https://api.twitter.com/1/statuses/oembed.json?url=%s')

  'Ustream':
    'pattern': '#ustream\.(tv|com)/.+#i'
    'factory': () -> new OEmbed('http://www.ustream.tv/oembed?format=json&url=%s')

  'Vhx':
    'pattern': '#vhx\.tv/.+#i'
    'factory': () -> new OEmbed('http://vhx.tv/services/oembed.json?url=%s')

  'Viddler':
    'pattern': '#viddler\.com/.+#i'
    'factory': () -> new OEmbed('http://www.viddler.com/oembed/?url=%s')

  'Videojug':
    'pattern': '#videojug\.com/(film|interview)/.+#i'
    'factory': () -> new OEmbed('http://www.videojug.com/oembed.json?url=%s')

  'Vimeo':
    'pattern': '#vimeo\.com#i'
    'factory': () -> new Vimeo('http://vimeo.com/api/oembed.json?url=%s')

  'Vine':
    'pattern': '#^https?://vine.co/v/[a-zA-Z0-9]+#i'
    'factory': () -> new Vine()

  'WordPress':
    'pattern': '#wordpress\\.com/.+#i'
    'factory': () -> new OEmbed('http://public-api.wordpress.com/oembed/1.0?format=json&for=me&url=%s')

  'Yfrog':
    'pattern': '#yfrog\.(com|ru|com\.tr|it|fr|co\.il|co\.uk|com\.pl|pl|eu|us)/.+#i'
    'factory': () -> new OEmbed('http://www.yfrog.com/api/oembed?format=json&url=%s')

  'Youtube':
    'pattern': '#youtube\.com|youtu\.be#i'
    'factory': () -> new Youtube('http://www.youtube.com/oembed?format=json&url=%s')

  # The following services will try to embed any URL.

  #'OEmbed':
  # 'pattern': '#.+#'
  # 'factory': () -> new OEmbed()

  #'OpenGraph':
  # 'pattern': '#.+#'
  # 'factory': () -> new OpenGraph()



module.exports = services
