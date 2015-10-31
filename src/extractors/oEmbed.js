/**
 *
 */
import {FORMAT_JSON} from './oEmbedFormats';



/**
 *
 */
export default function oEmbedExtractor(endpoint, format = FORMAT_JSON) {
	return async function extractOEmbed(req, res) {
		return res.withProp('title', 'Video title');
	}
}
