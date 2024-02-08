import { sanitizeString } from './sanitizeString';
import traverse from 'traverse';

export const sanitizeObject = (obj: any) => {
	traverse(obj).forEach(function (this: any, item: any) {
		if (typeof item === 'string') this.update(sanitizeString(item));
	});

	return obj;
};
