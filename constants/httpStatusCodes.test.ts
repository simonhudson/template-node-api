import { httpStatusCodes } from './httpStatusCodes';

describe('httpStatusCodes', () => {
	it('should return expected values', () => {
		expect(httpStatusCodes).toEqual({
			BAD_REQUEST: 400,
			CONFLICT: 409,
			FORBIDDEN: 403,
			METHOD_NOT_ALLOWED: 405,
			NOT_FOUND: 404,
			OK: 200,
			SERVER_ERROR: 500,
			UNAUTHORIZED: 401,
			UNKNOWN_ERROR: 520,
		});
	});
});
