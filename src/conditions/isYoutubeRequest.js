/**
 *
 */
const pattern = /youtube\.com|youtu\.be/i;



/**
 *
 */
export default function isYoutubeRequest({req}) {
	return pattern.test(req.url());
}
