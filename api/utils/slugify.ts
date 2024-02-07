export const slugify = (str: string): string =>
	str
		.toLowerCase()
		.trim()
		.replace(/[ ]{1,}/g, '-');
