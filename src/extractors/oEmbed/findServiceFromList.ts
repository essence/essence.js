import OEmbedService from './OEmbedService';



export default function findServiceFromList(
	services: ReadonlyArray<OEmbedService>,
	url: string
): OEmbedService {
	return services.find(({pattern}) =>
		pattern.test(url)
	);
}
