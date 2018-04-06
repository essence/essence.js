import OEmbedFormat from './OEmbedFormat';



export default interface OEmbedService {
	readonly pattern?: RegExp,
	readonly endpoint: string,
	readonly format: OEmbedFormat
}
