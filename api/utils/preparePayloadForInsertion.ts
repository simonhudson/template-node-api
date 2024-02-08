import { sanitizePayload } from '@/api/utils/sanitizePayload';
import { sortObjectByKey } from '@/api/utils/sortObjectByKey';

export const preparePayloadForInsertion = (payload: any) => {
	let finalPayload = sortObjectByKey(payload);
	finalPayload = sanitizePayload(finalPayload);
	return finalPayload;
};
