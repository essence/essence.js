/**
 *
 */
export default function fillUrl({req, res, err}) {
	const filledRes =
		(!res.isEmpty() && !res.has('url'))
			? res.withProp('url', req.url())
			: res;

	return {
		req,
		res: filledRes,
		err
	};
}
