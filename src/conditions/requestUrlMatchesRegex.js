/**
 *	Returns a condition that tests a request URL against
 *	the given regex.
 *
 *	@param Regexp regex Regex.
 *	@return function Condition.
 */
export default function createRequestUrlMatcher(regex) {

	/**
	 *	Tells if the given request url matches a regex.
	 *
	 *	@param object payload Payload.
	 *	@return bool
	 */
	return ({req}) => regex.test(req.url());
}
