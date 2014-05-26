#
Q = require('q')



# A service providing embed informations.
class Service

	# Fetches informations from the given URL.
	# @param {string} url - URL.
	# @param {object} options - Options.
	fetch: (url, options) ->
		dfd = Q.defer()
		url = @prepareUrl(url, options)

		@_fetch(url, options).then(
			(media) ->
				media.setDefault('url', url)
				media = @completeMedia(media, options)
				dfd.resolve(media)
			(error) ->
				dfd.resolve(error)
		)

		dfd.promise

	# Actually fetches informations.
	# @param {string} url - URL.
	# @param {object} options - Options.
	_fetch: (url, options) ->
		Q.reject('Not implemented.')

	# Prepares the given URL before fetching informations from it.
	# @param {string} url - URL.
	# @param {object} options - Options.
	prepareUrl: (url, options) ->
		url.trim()

	# Completes the informations of the given Media.
	# @param {object} media - Media.
	# @param {object} options - Options.
	completeMedia: (media, options) ->
		media



module.exports = Service
