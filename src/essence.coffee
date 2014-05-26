#
Q = require('q')



#
class Essence

	#
	constructor: (@config = {}) ->
		if @config.length is 0
			@config = require('./services')

		@services = {}

	#
	fetch: (url, options, callback) ->
		dfd = Q.defer()

		for name, config of @config
			if config.filter.matches(url)
				service = @service(name, config)
				media = service.fetch(url, options)
				return media if media

		fetch

		dfd.promise

	#
	service: (name, config) ->
		if !(name in @services)
			@services[name] = config.factory()

		return @services[name]



module.exports = Essence
