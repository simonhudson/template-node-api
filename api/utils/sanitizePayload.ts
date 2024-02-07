import { sanitizeString } from './sanitizeString';

type Payload = { [key: string]: any };

export const sanitizePayload = (payload: Payload): Payload => {
	for (let key in payload) {
		if (typeof payload[key] === 'string') payload[key] = sanitizeString(payload[key]);
	}
	return payload;
};
