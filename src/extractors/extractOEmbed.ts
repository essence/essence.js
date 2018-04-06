import Payload from '../Payload';



export default async function extractOEmbed(
	findService,
	extract,
	payload: Payload
): Promise<Payload> {
	const service = await findService(payload.req.url);
	return service
		? extract(service, payload)
		: payload;
}
