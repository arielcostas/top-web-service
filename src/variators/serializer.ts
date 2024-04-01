enum SerializationFormat {
	Json,
	Xml,
	Plain
}

function generateError(message: string, format: SerializationFormat): string {
	return generate({ error: message }, format);
}

function generate(data: any, format: SerializationFormat): string {
	switch (format) {
		case SerializationFormat.Json:
			return JSON.stringify(data);
		case SerializationFormat.Xml:
			const serializer = new XMLSerializer();
			return serializer.serializeToString(data);
		case SerializationFormat.Plain:
			return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
	}
}