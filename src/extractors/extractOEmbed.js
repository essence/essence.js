/**
 *
 */
export default async function extractOEmbed(
	findService,
	extractOEmbed,
	payload
) {
	const service = await findService(payload.req.url());
	return service
		? extractOEmbed(service, payload)
		: payload;
}
