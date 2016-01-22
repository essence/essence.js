/**
 *
 */



/**
 *	@TODO inject pattern and URL.
 */
export default function youtubePreparator() {
	return async function prepareYoutube({req, res, err}) {
		const pattern = /(?:v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)/i;
		const matches = pattern.exec(req.url);

		if (matches && matches[1]) {
			const url = 'https://www.youtube.com/watch?v=' + matches[1];

			return {
				req: req.withUrl(url),
				res,
				err
			};
		}

		return {req, res, err};
	};
}
