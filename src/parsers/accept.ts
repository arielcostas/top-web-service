import { SerializationFormat } from "../models/serializationFormat";

export function parseAcceptHeader(header: string): SerializationFormat|undefined {
	const ordered = splitAndOrder(header);
	for (const accept of ordered) {
		if (accept === "*/*" || accept === "*" || accept==="application/*") {
			return SerializationFormat.Json;
		}

		if (accept === SerializationFormat.Xml) {
			return SerializationFormat.Xml;
		}

		if (accept === SerializationFormat.Plain) {
			return SerializationFormat.Plain;
		}

		if (accept === SerializationFormat.Json) {
			return SerializationFormat.Json;
		}
	}

	return undefined;
}

/**
 * Splits the accept header and orders it by quality. The quality is defined by the q parameter.
 * @param accept the accept header
 * @returns the ordered accept header
 */
function splitAndOrder(accept: string): string[] {
	const accepts = accept.split(',').map((accept) => accept.trim());
	const tupled = accepts.map(accept => {
		const [type, q] = accept.split(';q=');
		return {
			type,
			q: q ? parseFloat(q) : 1
		};
	});

	return tupled.sort((a, b) => b.q - a.q).map(a => a.type);
}