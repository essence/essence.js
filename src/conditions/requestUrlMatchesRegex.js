/**
 *	Tells if the given request url matches a regex.
 *
 *	@param Regexp regex Regex.
 *	@param object payload Payload.
 *	@return bool
 */
export default function requestUrlMatchesRegex(regex, {req}) {
	return regex.test(req.url());
}
