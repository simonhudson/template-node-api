import traverse from 'traverse';
import type { BaseObject } from '@/types/base';

export const obfuscateObject = (
	obj: BaseObject,
	allowList?: string[],
	replacementValue: string = '[OBFUSCATED]'
): BaseObject => {
	traverse(obj).forEach(function (this: any, item: any) {
		if (typeof item === 'string' && !allowList?.includes(this.key)) this.update(replacementValue);
	});
	return obj;
};
