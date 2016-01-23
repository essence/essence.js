/**
 *
 */
export default function Request(url) {
	function getUrl() {
		return url;
	}

	function withUrl(url) {
		return Request(url);
	}

	return {
		withUrl,
		url: getUrl
	};
}
