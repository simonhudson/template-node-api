import { sanitizeObject } from '@/api/utils/sanitizeObject';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';
import type { BaseObject } from '@/api/types/base';

export const preparePayloadForInsertion = (payload: BaseObject): BaseObject => {
	let finalPayload = sortObjectByKey(payload);
	finalPayload = sanitizeObject(finalPayload);
	return finalPayload;
};
