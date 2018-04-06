import OEmbedService from './OEmbedService';
import findServiceFromHtml from './findServiceFromHtml';



export default async function findServiceFromUrl(
	getBody,
	url: string
): Promise<OEmbedService> {
	const html = await getBody(url);
	return findServiceFromHtml(html);
};
