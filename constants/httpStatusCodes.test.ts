import { httpStatusCodes } from './httpStatusCodes';

describe('httpStatusCodes', () => {
	it('should return expected values', () => {
		expect(httpStatusCodes).toEqual({
			OK: 200,
			BAD_REQUEST: 400,
			UNAUTHORIZED: 401,
			FORBIDDEN: 403,
			NOT_FOUND: 404,
			METHOD_NOT_ALLOWED: 405,
			CONFLICT: 409,
			SERVER_ERROR: 500,
			UNKNOWN_ERROR: 520,
		});
	});
});
