/**
 *	@author Félix Girault <felix.girault@gmail.com>
 */
'use strict';

var _ = require('lodash');
var should = require('should');
var utils = require('../lib/utils');



/**
 *
 */
describe('utils', function() {
	describe('#reindex', function() {
		var data, map;

		beforeEach(function() {
			data = {'old': 'foo'};
			map = {'old': 'new'};
		});

		it('should reindex an object', function() {
			var reindexed = utils.reindex(data, map);
			reindexed.should.have.property('new', 'foo');
		});

		it('should not alter the original data', function() {
			var original = _.clone(data);
			var reindexed = utils.reindex(data, map);

			data.should.eql(original);
		});
	});
});
