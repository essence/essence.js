/**
 *
 */



/**
 *
 */
export default function fillUrl({req, res, err}) {
	const filledRes = res.has('url')
		? res
		: res.withProp('url', req.url());

	return {
		req,
		res: filledRes,
		err
	};
}
