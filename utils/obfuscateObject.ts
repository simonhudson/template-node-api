import traverse from 'traverse';
import type { BaseObject } from '@/types/base';

export const obfuscateObject = (
	obj: BaseObject,
	allowList: string[],
	replacementValue: string = '[OBFUSCATED]'
): BaseObject => {
	traverse(obj).forEach(function (this: any, item: any) {
		allowList.forEach((key) => {
			if (this.key !== key) this.update(replacementValue);
		});
	});

	return obj;
};
