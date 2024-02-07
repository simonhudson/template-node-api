type Object = { [key: string]: any };

export const sortObjectByKey = (obj: Object): Object => {
	const newKeys: any[] = Object.keys(obj).sort();
	const sortedObj: Object = {};

	newKeys.forEach((key) => {
		sortedObj[key] = obj[key];
	});

	return sortedObj;
};
