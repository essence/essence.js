/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var co = require('co');
var should = require('should');
var MetaTags = require('../../../lib/services/metatags');
var TwitterCards = require('../../../lib/services/metatags/twittercards');



/**
 *
 */
describe('TwitterCards', function() {
	var twitterCards = null;

	beforeEach(function() {
		twitterCards = new TwitterCards();
	});

	it('should extend MetaTags', function() {
		twitterCards.should.be.an.instanceOf(MetaTags);
	});

	describe('#_reindexInfos', function() {
		it('should reindex informations for a player card', function() {
			var infos = twitterCards._reindexInfos({
				'twitter:card': 'player',
				'twitter:player': 'http://video.com',
				'twitter:player:width': 800,
				'twitter:player:height': 600,
				'twitter:image': 'http://thumbnail.com',
				'twitter:image:width': 400,
				'twitter:image:height': 300
			}, twitterCards._options.reindex);

			infos.should.have.property({
				'url': 'http://video.com',
				'width': 800,
				'height': 600,
				'thumbnailUrl': 'http://thumbnail.com',
				'thumbnailWidth': 400,
				'thumbnailHeight': 300
			});
		});

		it('should reindex informations for other card types', function() {
			var infos = twitterCards._reindexInfos({
				'twitter:card': 'photo',
				'twitter:image': 'http://thumbnail.com',
				'twitter:image:width': 800,
				'twitter:image:height': 600
			}, twitterCards._options.reindex);

			infos.should.have.property({
				'url': 'http://thumbnail.com',
				'width': 800,
				'height': 600
			});
		});
	});
});
