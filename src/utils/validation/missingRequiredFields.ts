import { BaseObject } from '@/types/base';

export const missingRequiredFields = (requestBody: BaseObject, required: string[]): string[] => {
	const invalidFields: string[] = [];
	required.forEach((field): void => {
		if (!requestBody[field]) invalidFields.push(field);
	});
	return invalidFields;
};
