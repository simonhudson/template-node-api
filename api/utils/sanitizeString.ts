import xss from 'xss';

export const sanitizeString = (value?: string | undefined): string | undefined => (value ? xss(value) : undefined);
