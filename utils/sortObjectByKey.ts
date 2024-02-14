import type { BaseObject } from '@/types/base';

export const sortObjectByKey = (obj: BaseObject): BaseObject => {
	const newKeys: any[] = Object.keys(obj).sort();
	const sortedObj: BaseObject = {};
	newKeys.forEach((key): void => {
		sortedObj[key] = obj[key];
	});
	return sortedObj;
};
