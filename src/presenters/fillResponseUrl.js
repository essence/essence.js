/**
 *
 */
export default function fillResponseUrl({req, res}) {
	const filledRes =
		(!res.isEmpty() && !res.has('url'))
			? res.withProp('url', req.url())
			: res;

	return {
		req,
		res: filledRes
	};
}
