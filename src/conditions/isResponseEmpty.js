/**
 *	Tells if the given response is empty.
 *
 *	@param object payload Payload.
 *	@return bool
 */
export default function isResponseEmpty({res}) {
	return res.isEmpty();
}
