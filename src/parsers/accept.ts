function checkAccepts(format: string, header: string)
{
	// TODO: Improve algorithm to handle quality and wildcards
	const accepts = header.split(',').map((accept) => accept.trim());
	return accepts.includes(format);
}