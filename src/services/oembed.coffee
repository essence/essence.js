#
Q = require('q')
request = require('request')
Digester = require('xml-digester').XmlDigester({})
Service = require('../service')



#
class OEmbed extends Service

	# Constructor.
	# @param {string} endpoint - OEmbed endpoint.
	# @param {string} - Response format.
	constructor: (@_endpoint = '', @_format = 'json') ->

	# {@inheritDoc}
	_fetch: (url, options) ->
		dfd = Q.defer()
		config = @_config()

		request(config.url, (error, response, body) =>
			if error or response.statusCode isnt 200
				dfd.reject('Error #{response.statusCode} while fetching #{url}')
				return

			resolve = (data) ->
				dfd.resolve(new Media(data))

			switch config.format
				when 'json' then @_parseJson(body, resolve)
				when 'xml' then @_parseXml(body, resolve)
				else dfd.reject('Unsupported response format')
		)

		dfd.promise

	#
	# @return {object} - Configuration.
	_config: () ->
		config = @endpoint
			? @_buildConfig(url)
			: @_extractConfig(url)

		if config.length is 0
			dfd.reject('Unable to extract any endpoint from #{url}')
			return

		if options
			config.url = @_completeUrl(config.url, options)

		config

	# Builds a configuration from the endpoint scheme.
	# @return {object} - Configuration.
	_buildConfig: (url) ->
		{
			url: sprintf(@_endpoint, urlencode(url))
			format: @_format
		}

	# Searches for an OEmbed meta tag in the given page and returns its
	# endpoint and format.
	# @param {string} url - URL of the page to parse.
	# @return {object} - Configuration.
	_extractConfig: (url) ->
		{}

	# Completes the given URL with OEmbed options.
	# @param {string} url - URL.
	# @param {object} options - Options.
	_completeUrl: (url, options) ->
		url

	# Parses the given JSON string.
	# @param {string} json - JSON string.
	# @param {function} callback - Function to call with the parsed data.
	_parseJson: (json, callback) ->
		try
			callback(JSON.parse(json))
		catch e
			dfd.reject('Error parsing JSON: #{e}')

	# Parses the given XML string.
	# @param {string} xml - XML string.
	# @param {function} callback - Function to call with the parsed data.
	_parseXml: (xml, callback) ->
		Digester.digest((err, data) ->
			if err
				dfd.reject('Error parsing XML')
			else
				callback(data.oembed)
		)
