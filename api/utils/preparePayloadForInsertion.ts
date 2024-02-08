import { sanitizeObject } from '@/api/utils/sanitizeObject';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';

export const preparePayloadForInsertion = (payload: any) => {
	let finalPayload = sortObjectByKey(payload);
	finalPayload = sanitizeObject(finalPayload);
	return finalPayload;
};
