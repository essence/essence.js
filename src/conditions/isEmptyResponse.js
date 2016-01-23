/**
 *
 */
export default function isEmptyResponse({res}) {
	return !res.has('title');
}
