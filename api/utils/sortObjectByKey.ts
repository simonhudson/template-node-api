import type { BaseObject } from '@/api/types/base';

export const sortObjectByKey = (obj: BaseObject): BaseObject => {
	const newKeys: any[] = Object.keys(obj).sort();
	const sortedObj: BaseObject = {};
	newKeys.forEach((key) => {
		sortedObj[key] = obj[key];
	});
	return sortedObj;
};
