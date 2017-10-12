/**
 *
 */
export default async function extractOEmbed(
	findService,
	extract,
	payload
) {
	const service = await findService(payload.req.url());
	return service
		? extract(service, payload)
		: payload;
}
