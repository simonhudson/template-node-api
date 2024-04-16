export const slugify = (str: string): string =>
	str
		.toLowerCase()
		.trim()
		.replace(/\'/g, '')
		.replace(/[^a-zA-Z0-9]/g, '-')
		.replace(/-{2,}/g, '-');
