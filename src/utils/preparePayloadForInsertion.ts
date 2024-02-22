import { sanitizeObject } from '@/utils/sanitizeObject';
import { sortObjectByKey } from '@/utils/sortObjectByKey';
import type { BaseObject } from '@/types/base';

export const preparePayloadForInsertion = (payload: BaseObject): BaseObject => {
	let finalPayload = sortObjectByKey(payload);
	finalPayload = sanitizeObject(finalPayload);
	return finalPayload;
};
