import { SerializationFormat } from "../models/serializationFormat";

export function serialize(data: any, format: SerializationFormat): string {
	switch (format) {
		case SerializationFormat.Json:
		case SerializationFormat.ProblemJson:
			return JSON.stringify(data);
		case SerializationFormat.Xml:
		case SerializationFormat.Plain:
			return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
	}
}