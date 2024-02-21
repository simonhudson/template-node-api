import traverse from 'traverse';
import type { BaseObject } from '@/types/base';

const DEFAULT_ALLOW_LIST = ['_id', 'count', 'data', 'endpoint', 'error', 'message', 'metadata', 'method', 'status'];

export const obfuscateObject = (
	obj: BaseObject,
	allowList: string[] = DEFAULT_ALLOW_LIST,
	replacementValue: string = '[OBFUSCATED]'
): BaseObject => {
	if (process.env.NODE_ENV !== 'production') return obj;
	const allow = Array.from(new Set([...DEFAULT_ALLOW_LIST, ...allowList]));
	traverse(obj).forEach(function (this: any, item: any) {
		if (['string'].includes(typeof item) && !allow?.includes(this.key)) this.update(replacementValue);
	});
	return obj;
};
