import { SerializationFormat } from "../models/serializationFormat";

export function parseAcceptHeader(header: string): SerializationFormat {
	const accepts = header.split(',').map((accept) => accept.trim());

	if (accepts.includes('application/xml')) {
		return SerializationFormat.Xml;
	}

	if (accepts.includes('text/plain')) {
		return SerializationFormat.Plain;
	}

	return SerializationFormat.Json;
}