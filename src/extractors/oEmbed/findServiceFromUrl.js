import findServiceFromHtml from './findServiceFromHtml';



/**
 *
 */
export default async function findServiceFromUrl(getBody, url) {
	const html = await getBody(url);
	return findServiceFromHtml(html);
};