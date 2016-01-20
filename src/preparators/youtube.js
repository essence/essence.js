/**
 *
 */



/**
 *
 */
export default function youtubePreparator() {
	return async function prepareYoutube(req) {
		const pattern = /(?:v=|v\/|embed\/|youtu\.be\/)([a-z0-9_-]+)/i;
		const matches = pattern.exec(req.url);

		if (matches && matches[1]) {
			return req.withUrl(
				'https://www.youtube.com/watch?v=' + matches[1]
			);
		}

		return req;
	}
};
