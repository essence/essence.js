/**
 *
 */
export default function refactorRequestUrl(
	regex,
	replacement,
	{req, ...payload}
) {
	return {
		...payload,
		req: req.withUrl(
			req.url().replace(
				regex,
				replacement
			)
		)
	};
}
