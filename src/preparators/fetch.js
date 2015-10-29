/**
 *
 */



/**
 *
 */
export default function fetch(url) {
	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if (error || response.statusCode !== 200) {
				reject(`Error while extracting ${url}: ${response.statusCode}`);
			} else {
				resolve(body);
			}
		});
	});
}
