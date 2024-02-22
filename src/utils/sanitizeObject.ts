import { sanitizeString } from './sanitizeString';
import traverse from 'traverse';
import type { BaseObject } from '@/types/base';

export const sanitizeObject = (obj: BaseObject): BaseObject => {
	traverse(obj).forEach(function (this: any, item: any) {
		if (typeof item === 'string') this.update(sanitizeString(item));
	});
	return obj;
};
